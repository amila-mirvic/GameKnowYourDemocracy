import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CorrectFlash from '../../components/game/CorrectFlash';
import FlyItemsLayer from '../../components/game/FlyItemsLayer';
import GameplayShell from '../../components/game/GameplayShell';
import InfoModal from '../../components/game/InfoModal';
import QuestionCard from '../../components/game/QuestionCard';
import QuizAnswerGrid from '../../components/game/QuizAnswerGrid';
import TaskCompletionModal from '../../components/game/TaskCompletionModal';
import TaskTopBar from '../../components/game/TaskTopBar';
import { WORLD4_FEEDBACK_MESSAGES, WORLD4_TASK3 } from '../../game/content/world4Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';

const MAIN_MENU_ROUTE = '/world-4';
const NEXT_TASK_ROUTE = '/world-4/task-4-intro';

const resolveSkillBadge = (points) => {
  if (points <= 8) return { id: 'beginner', src: WORLD4_TASK3.badges.beginner };
  if (points <= 22) return { id: 'advanced', src: WORLD4_TASK3.badges.advanced };
  return { id: 'expert', src: WORLD4_TASK3.badges.expert };
};

export default function World4Task3Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toUpperCase();

  const [index, setIndex] = useState(0);
  const current = WORLD4_TASK3.rounds?.[index] || null;
  const [points, setPoints] = useState(0);
  const [curiosityPoints] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [topMessage, setTopMessage] = useState(`${nameUpper} BUILD YOUR INFLUENCE`);
  const [endOpen, setEndOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  const pointsTargetRef = useRef(null);
  const curiosityTargetRef = useRef(null);
  const cardRef = useRef(null);
  const [flyItems, setFlyItems] = useState([]);
  const flyIdRef = useRef(0);
  const [pulsePoints, setPulsePoints] = useState(false);
  const [pulseCuriosity] = useState(false);

  useEffect(() => {
    setTopMessage(`${nameUpper} BUILD YOUR INFLUENCE`);
  }, [nameUpper]);

  useEffect(() => {
    setLocked(false);
  }, [index]);

  const pickTopMessage = useCallback(() => {
    setTopMessage((prev) => {
      let next = prev;
      let guard = 0;
      while (next === prev && guard < 10) {
        next =
          WORLD4_FEEDBACK_MESSAGES[
            Math.floor(Math.random() * WORLD4_FEEDBACK_MESSAGES.length)
          ].replace('{NAME}', nameUpper);
        guard += 1;
      }
      return next;
    });
  }, [nameUpper]);

  const makeFly = useCallback(({ type, icon, delta }) => {
    const fromRect = cardRef.current?.getBoundingClientRect();
    const toRect =
      type === 'points'
        ? pointsTargetRef.current?.getBoundingClientRect()
        : curiosityTargetRef.current?.getBoundingClientRect();

    if (!fromRect || !toRect) return;

    const id = flyIdRef.current++;
    setFlyItems((items) => [
      ...items,
      {
        id,
        icon,
        delta,
        fromX: fromRect.left + fromRect.width * 0.65,
        fromY: fromRect.top + fromRect.height * 0.32,
        toX: toRect.left + toRect.width * 0.5,
        toY: toRect.top + toRect.height * 0.5,
      },
    ]);

    window.setTimeout(() => {
      setFlyItems((items) => items.filter((item) => item.id !== id));
      if (type === 'points') {
        setPulsePoints(true);
        window.setTimeout(() => setPulsePoints(false), 320);
      }
    }, 820);
  }, []);

  const showFlash = useCallback(() => {
    setFlashOpen(true);
    window.setTimeout(() => setFlashOpen(false), 520);
  }, []);

  const saveResults = useCallback((taskPoints, badges) => {
    safeWrite('yd_world4_task3', {
      points: taskPoints,
      curiosityPoints: 0,
      badges,
      totalRounds: WORLD4_TASK3.rounds.length,
      finishedAt: Date.now(),
    });

    if (!safeRead('yd_world4_task3_counted')) {
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

      safeWrite('yd_world4_task3_counted', true);
    }
  }, []);

  const finishTask = useCallback(() => {
    const badges = [resolveSkillBadge(points)];
    saveResults(points, badges);
    setEndOpen(true);
  }, [points, saveResults]);

  const nextRound = useCallback(() => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= WORLD4_TASK3.rounds.length) {
        window.setTimeout(() => finishTask(), 120);
        return prev;
      }
      return next;
    });
  }, [finishTask]);

  const handleOption = useCallback(
    (option) => {
      if (!current || modalOpen || endOpen || locked) return;

      setLocked(true);
      pickTopMessage();

      const isCorrect = option.key === current.correctKey;
      const gained = isCorrect ? option.points || 0 : 0;

      if (gained > 0) {
        makeFly({
          type: 'points',
          icon: WORLD4_TASK3.pointsIcon,
          delta: `+${gained}`,
        });
        window.setTimeout(() => setPoints((v) => v + gained), 320);
      }

      if (isCorrect) {
        showFlash();
        window.setTimeout(() => nextRound(), 680);
        return;
      }

      setModalText(current.feedbackMap?.[option.key] || 'Think about which message is most effective.');
      setModalOpen(true);

      window.setTimeout(() => {
        setModalOpen(false);
        nextRound();
      }, 920);
    },
    [current, endOpen, locked, makeFly, modalOpen, nextRound, pickTopMessage, showFlash]
  );

  const earnedBadges = useMemo(() => [resolveSkillBadge(points)], [points]);

  return (
    <GameplayShell backgroundUrl={WORLD4_TASK3.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD4_TASK3.pointsIcon}
        curiosityIcon={WORLD4_TASK3.curiosityIcon}
        pointsTargetRef={pointsTargetRef}
        curiosityTargetRef={curiosityTargetRef}
        pulsePoints={pulsePoints}
        pulseCuriosity={pulseCuriosity}
      />

      <div
        style={{
          display: 'grid',
          gap: '18px',
          justifyItems: 'center',
          alignContent: 'center',
          minHeight: 'calc(100dvh - 140px)',
          padding: '0 18px',
        }}
      >
        <QuestionCard cardRef={cardRef} title={current?.title || ''} text={current?.statement || ''} />

        <div style={{ width: '100%', maxWidth: '1120px' }}>
          <QuizAnswerGrid
            answers={(current?.options || []).map((option) => ({
              key: option.key,
              label: option.label,
              onClick: () => handleOption(option),
            }))}
          />
        </div>
      </div>

      <FlyItemsLayer items={flyItems} />
      <CorrectFlash open={flashOpen} label="GOOD MOVE" />
      <InfoModal open={modalOpen} onClose={() => setModalOpen(false)} text={modalText} />

      <TaskCompletionModal
        open={endOpen}
        onClose={() => navigate(MAIN_MENU_ROUTE, { state: player })}
        title={`BRAVO ${nameUpper} YOU BUILT A STRONGER MESSAGE!`}
        stats={[
          { label: 'POINTS', value: points },
          { label: 'CURIOSITY POINTS', value: curiosityPoints },
        ]}
        badges={earnedBadges}
        actions={[
          { label: 'GO BACK TO MAIN MENU', onClick: () => navigate(MAIN_MENU_ROUTE, { state: player }) },
          { label: 'GO TO TASK 4', onClick: () => navigate(NEXT_TASK_ROUTE, { state: player }) },
        ]}
      />
    </GameplayShell>
  );
}