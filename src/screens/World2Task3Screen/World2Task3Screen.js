import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CorrectFlash from '../../components/game/CorrectFlash';
import GameplayShell from '../../components/game/GameplayShell';
import InfoModal from '../../components/game/InfoModal';
import QuestionCard from '../../components/game/QuestionCard';
import QuizAnswerGrid from '../../components/game/QuizAnswerGrid';
import TaskCompletionModal from '../../components/game/TaskCompletionModal';
import TaskTopBar from '../../components/game/TaskTopBar';
import { WORLD2_FEEDBACK_MESSAGES, WORLD2_TASK3 } from '../../game/content/world2Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';
import styles from './World2Task3Screen.module.css';

const MAIN_MENU_ROUTE = '/world-2';

const resolveSkillBadge = (points) => {
  if (points <= 8) return { id: 'beginner', src: WORLD2_TASK3.badges.beginner };
  if (points <= 22) return { id: 'advanced', src: WORLD2_TASK3.badges.advanced };
  return { id: 'expert', src: WORLD2_TASK3.badges.expert };
};

export default function World2Task3Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toUpperCase();

  const [roundIndex, setRoundIndex] = useState(0);
  const current = WORLD2_TASK3.rounds[roundIndex];
  const [points, setPoints] = useState(0);
  const [curiosityPoints] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [topMessage, setTopMessage] = useState(`${nameUpper} KEEP GOING`);
  const [endOpen, setEndOpen] = useState(false);

  useEffect(() => {
    setTopMessage(`${nameUpper} KEEP GOING`);
  }, [nameUpper]);

  const pickTopMessage = useCallback(() => {
    setTopMessage((prev) => {
      let next = prev;
      let guard = 0;

      while (next === prev && guard < 10) {
        next =
          WORLD2_FEEDBACK_MESSAGES[
            Math.floor(Math.random() * WORLD2_FEEDBACK_MESSAGES.length)
          ].replace('{NAME}', nameUpper);
        guard += 1;
      }

      return next;
    });
  }, [nameUpper]);

  const showFlash = useCallback(() => {
    setFlashOpen(true);
    window.setTimeout(() => setFlashOpen(false), 520);
  }, []);

  const saveResults = useCallback((taskPoints, badges) => {
    safeWrite('yd_world2_task3', {
      points: taskPoints,
      curiosityPoints: 0,
      badges,
      totalRounds: WORLD2_TASK3.rounds.length,
      finishedAt: Date.now(),
    });

    if (!safeRead('yd_world2_task3_counted')) {
      const prev = safeRead('yd_scores', {
        totalPoints: 0,
        totalCuriosityPoints: 0,
        badges: [],
      });

      safeWrite('yd_scores', {
        totalPoints: (prev.totalPoints || 0) + taskPoints,
        totalCuriosityPoints: prev.totalCuriosityPoints || 0,
        badges: [...(prev.badges || []), ...badges],
      });

      safeWrite('yd_world2_task3_counted', true);
    }
  }, []);

  const finishTask = useCallback(() => {
    const badges = [resolveSkillBadge(points)];
    saveResults(points, badges);
    setEndOpen(true);
  }, [points, saveResults]);

  const nextRound = useCallback(() => {
    setRoundIndex((prev) => {
      const next = prev + 1;

      if (next >= WORLD2_TASK3.rounds.length) {
        window.setTimeout(() => finishTask(), 100);
        return prev;
      }

      return next;
    });
  }, [finishTask]);

  const handleOption = useCallback(
    (option) => {
      if (!current || modalOpen || endOpen) return;

      pickTopMessage();

      const isCorrect = option.key === current.correctKey;

      // ✅ TACAN ODGOVOR = samo bodovi + dalje, bez popup-a
      if (isCorrect) {
        showFlash();
        window.setTimeout(() => setPoints((v) => v + current.points), 320);
        window.setTimeout(() => nextRound(), 680);
        return;
      }

      // ❌ POGRESAN = popup
      setModalText(current.feedback);
      setModalOpen(true);
      window.setTimeout(() => nextRound(), 900);
    },
    [current, endOpen, modalOpen, nextRound, pickTopMessage, showFlash]
  );

  const earnedBadges = useMemo(() => [resolveSkillBadge(points)], [points]);

  return (
    <GameplayShell backgroundUrl={WORLD2_TASK3.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD2_TASK3.pointsIcon}
        curiosityIcon={WORLD2_TASK3.curiosityIcon}
      />

      <div className={styles.layout}>
        <QuestionCard title={current?.title || ''} text={current?.statement || ''} />

        <QuizAnswerGrid
          className={styles.tightGrid}
          answers={(current?.options || []).map((option) => ({
            key: option.key,
            label: option.label,
            onClick: () => handleOption(option),
          }))}
        />
      </div>

      <CorrectFlash open={flashOpen} label="CORRECT" />
      <InfoModal open={modalOpen} onClose={() => setModalOpen(false)} text={modalText} />

      <TaskCompletionModal
        open={endOpen}
        onClose={() => navigate(MAIN_MENU_ROUTE, { state: player })}
        title={`BRAVO ${nameUpper} YOU NAILED IT!`}
        stats={[
          { label: 'POINTS', value: points },
          { label: 'CURIOSITY POINTS', value: curiosityPoints },
        ]}
        badges={earnedBadges}
        actions={[
          { label: 'GO BACK TO MAIN MENU', onClick: () => navigate(MAIN_MENU_ROUTE, { state: player }) },
        ]}
      />
    </GameplayShell>
  );
}