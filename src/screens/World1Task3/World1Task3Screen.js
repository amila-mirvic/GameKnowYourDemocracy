import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnswerButtonsV1 from '../../components/game/AnswerButtonsV1';
import CorrectFlash from '../../components/game/CorrectFlash';
import GameplayShell from '../../components/game/GameplayShell';
import InfoModal from '../../components/game/InfoModal';
import QuestionCard from '../../components/game/QuestionCard';
import QuizAnswerGrid from '../../components/game/QuizAnswerGrid';
import TaskCompletionModal from '../../components/game/TaskCompletionModal';
import TaskTopBar from '../../components/game/TaskTopBar';
import { WORLD1_FEEDBACK_MESSAGES, WORLD1_TASK3 } from '../../game/content/world1Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';

const MAIN_MENU_ROUTE = '/world-1';
const NEXT_TASK_ROUTE = '/world-1/task-4-intro';

const resolveSkillBadge = (correct) => {
  if (correct <= 1) return { id: 'beginner', src: WORLD1_TASK3.badges.beginner };
  if (correct <= 3) return { id: 'advanced', src: WORLD1_TASK3.badges.advanced };
  return { id: 'expert', src: WORLD1_TASK3.badges.expert };
};

export default function World1Task3Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toString().toUpperCase();

  const [caseIndex, setCaseIndex] = useState(0);
  const current = WORLD1_TASK3.cases[caseIndex];
  const [phase, setPhase] = useState('judgement');
  const [points, setPoints] = useState(0);
  const [curiosityPoints, setCuriosityPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [topMessage, setTopMessage] = useState(`${nameUpper} KEEP GOING`);
  const [endOpen, setEndOpen] = useState(false);

  useEffect(() => setTopMessage(`${nameUpper} KEEP GOING`), [nameUpper]);

  const pickTopMessage = useCallback(() => {
    setTopMessage((prev) => {
      let next = prev;
      let guard = 0;
      while (next === prev && guard < 10) {
        next = WORLD1_FEEDBACK_MESSAGES[Math.floor(Math.random() * WORLD1_FEEDBACK_MESSAGES.length)].replace('{NAME}', nameUpper);
        guard += 1;
      }
      return next;
    });
  }, [nameUpper]);

  const showFlash = useCallback(() => {
    setFlashOpen(true);
    window.setTimeout(() => setFlashOpen(false), 520);
  }, []);

  const saveResults = useCallback((taskPoints, taskCuriosity, badges) => {
    safeWrite('yd_world1_task3', {
      points: taskPoints,
      curiosityPoints: taskCuriosity,
      badges,
      correctCount,
      totalCases: WORLD1_TASK3.cases.length,
      finishedAt: Date.now(),
    });
    if (!safeRead('yd_world1_task3_counted')) {
      const prev = safeRead('yd_scores', { totalPoints: 0, totalCuriosityPoints: 0, badges: [] });
      safeWrite('yd_scores', {
        totalPoints: (prev.totalPoints || 0) + taskPoints,
        totalCuriosityPoints: (prev.totalCuriosityPoints || 0) + taskCuriosity,
        badges: [...(prev.badges || []), ...badges],
      });
      safeWrite('yd_world1_task3_counted', true);
    }
  }, [correctCount]);

  const finishTask = useCallback(() => {
    const badges = [resolveSkillBadge(correctCount)];
    if (curiosityPoints >= 5) badges.push({ id: 'curiosity', src: WORLD1_TASK3.badges.curiosity });
    saveResults(points, curiosityPoints, badges);
    setEndOpen(true);
  }, [correctCount, curiosityPoints, points, saveResults]);

  const nextCase = useCallback(() => {
    setCaseIndex((prev) => {
      const next = prev + 1;
      if (next >= WORLD1_TASK3.cases.length) {
        window.setTimeout(() => finishTask(), 100);
        return prev;
      }
      return next;
    });
    setPhase('judgement');
  }, [finishTask]);

  const handleChoice = useCallback((choice) => {
    if (!current || modalOpen || endOpen || phase !== 'judgement') return;
    pickTopMessage();
    const isCorrect = choice === current.part1Correct;
    if (isCorrect) {
      if (choice === 'middle') setCuriosityPoints((v) => v + 1);
      showFlash();
      setCorrectCount((v) => v + 1);
      window.setTimeout(() => setPoints((v) => v + 2), 420);
      window.setTimeout(() => setPhase('response'), 620);
      return;
    }
    setModalText(current.part1Why || 'NOT QUITE. THINK AGAIN.');
    setModalOpen(true);
  }, [current, endOpen, modalOpen, phase, pickTopMessage, showFlash]);

  const handlePath = useCallback((path) => {
    if (!current || modalOpen || endOpen || phase !== 'response') return;
    pickTopMessage();
    if (path.correct) {
      showFlash();
      setCorrectCount((v) => v + 1);
      window.setTimeout(() => setPoints((v) => v + 2), 420);
      window.setTimeout(() => nextCase(), 640);
      return;
    }
    setModalText(current.pathWhy || 'NOT QUITE. TRY A DIFFERENT PATH.');
    setModalOpen(true);
  }, [current, endOpen, modalOpen, nextCase, phase, pickTopMessage, showFlash]);

  const earnedBadges = useMemo(() => {
    const badges = [resolveSkillBadge(correctCount)];
    if (curiosityPoints >= 5) badges.push({ id: 'curiosity', src: WORLD1_TASK3.badges.curiosity });
    return badges;
  }, [correctCount, curiosityPoints]);

  return (
    <GameplayShell backgroundUrl={WORLD1_TASK3.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD1_TASK3.pointsIcon}
        curiosityIcon={WORLD1_TASK3.curiosityIcon}
      />

      <div style={{ display: 'grid', gap: '22px', justifyItems: 'center', alignContent: 'center', minHeight: 'calc(100dvh - 140px)' }}>
        <QuestionCard text={current?.statement || ''} />
        {phase === 'judgement' ? (
          <AnswerButtonsV1
            answers={[
              { key: 'correct', image: WORLD1_TASK3.answerButtons.correct, label: 'Yes', onClick: () => handleChoice('correct') },
              { key: 'middle', image: WORLD1_TASK3.answerButtons.middle, label: 'Not sure', onClick: () => handleChoice('middle') },
              { key: 'wrong', image: WORLD1_TASK3.answerButtons.wrong, label: 'No', onClick: () => handleChoice('wrong') },
            ]}
          />
        ) : (
          <QuizAnswerGrid
            answers={(current?.paths || []).map((path) => ({
              key: path.key,
              label: path.label,
              onClick: () => handlePath(path),
            }))}
          />
        )}
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
          { label: 'GO TO TASK 4', onClick: () => navigate(NEXT_TASK_ROUTE, { state: player }) },
        ]}
      />
    </GameplayShell>
  );
}
