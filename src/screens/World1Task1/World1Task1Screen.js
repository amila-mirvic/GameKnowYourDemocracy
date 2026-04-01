import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnswerButtonsV1 from '../../components/game/AnswerButtonsV1';
import CorrectFlash from '../../components/game/CorrectFlash';
import FlyItemsLayer from '../../components/game/FlyItemsLayer';
import GameplayShell from '../../components/game/GameplayShell';
import InfoModal from '../../components/game/InfoModal';
import QuestionCard from '../../components/game/QuestionCard';
import TaskCompletionModal from '../../components/game/TaskCompletionModal';
import TaskTopBar from '../../components/game/TaskTopBar';
import { WORLD1_FEEDBACK_MESSAGES, WORLD1_TASK1 } from '../../game/content/world1Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';

const MAIN_MENU_ROUTE = '/world-1';
const NEXT_TASK_ROUTE = '/world-1/task-2-intro';

const resolveSkillBadge = (correct) => {
  if (correct <= 4) return { id: 'beginner', src: WORLD1_TASK1.badges.beginner };
  if (correct <= 8) return { id: 'advanced', src: WORLD1_TASK1.badges.advanced };
  return { id: 'expert', src: WORLD1_TASK1.badges.expert };
};

export default function World1Task1Screen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toString().toUpperCase();

  const [index, setIndex] = useState(0);
  const current = WORLD1_TASK1.statements[index] || null;
  const [points, setPoints] = useState(0);
  const [curiosityPoints, setCuriosityPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [popupAdvance, setPopupAdvance] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [flashOpen, setFlashOpen] = useState(false);
  const [topMessage, setTopMessage] = useState(`${nameUpper} KEEP GOING`);
  const whyUsesRef = useRef(0);
  const pointsTargetRef = useRef(null);
  const curiosityTargetRef = useRef(null);
  const cardRef = useRef(null);
  const [flyItems, setFlyItems] = useState([]);
  const flyIdRef = useRef(0);
  const [pulsePoints, setPulsePoints] = useState(false);
  const [pulseCuriosity, setPulseCuriosity] = useState(false);

  useEffect(() => setTopMessage(`${nameUpper} KEEP GOING`), [nameUpper]);

  const pickNewTopMessage = useCallback(() => {
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

  const makeFly = useCallback(({ type, icon, delta }) => {
    const fromRect = cardRef.current?.getBoundingClientRect();
    const toRect = type === 'points'
      ? pointsTargetRef.current?.getBoundingClientRect()
      : curiosityTargetRef.current?.getBoundingClientRect();
    if (!fromRect || !toRect) return;
    const id = flyIdRef.current++;
    setFlyItems((items) => [...items, {
      id,
      icon,
      delta,
      fromX: fromRect.left + fromRect.width * 0.65,
      fromY: fromRect.top + fromRect.height * 0.32,
      toX: toRect.left + toRect.width * 0.5,
      toY: toRect.top + toRect.height * 0.5,
    }]);
    window.setTimeout(() => {
      setFlyItems((items) => items.filter((item) => item.id !== id));
      if (type === 'points') {
        setPulsePoints(true);
        window.setTimeout(() => setPulsePoints(false), 320);
      } else {
        setPulseCuriosity(true);
        window.setTimeout(() => setPulseCuriosity(false), 320);
      }
    }, 820);
  }, []);

  const showFlash = useCallback((ms = 520) => {
    setFlashOpen(true);
    window.setTimeout(() => setFlashOpen(false), ms);
  }, []);

  const saveResults = useCallback((taskPoints, taskCuriosity, badges) => {
    safeWrite('yd_world1_task1', {
      points: taskPoints,
      curiosityPoints: taskCuriosity,
      badges,
      correctCount,
      totalQuestions: WORLD1_TASK1.statements.length,
      finishedAt: Date.now(),
    });
    if (!safeRead('yd_world1_task1_counted')) {
      const prev = safeRead('yd_scores', { totalPoints: 0, totalCuriosityPoints: 0, badges: [] });
      safeWrite('yd_scores', {
        totalPoints: (prev.totalPoints || 0) + taskPoints,
        totalCuriosityPoints: (prev.totalCuriosityPoints || 0) + taskCuriosity,
        badges: [...(prev.badges || []), ...badges],
      });
      safeWrite('yd_world1_task1_counted', true);
    }
  }, [correctCount]);

  const finishTask = useCallback(() => {
    const badges = [resolveSkillBadge(correctCount)];
    if (curiosityPoints >= 5) {
      badges.push({ id: 'curiosity', src: WORLD1_TASK1.badges.curiosity });
    }
    saveResults(points, curiosityPoints, badges);
    setEndOpen(true);
  }, [correctCount, curiosityPoints, points, saveResults]);

  const advance = useCallback(() => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= WORLD1_TASK1.statements.length) {
        window.setTimeout(() => finishTask(), 100);
        return prev;
      }
      return next;
    });
  }, [finishTask]);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
    setPopupText('');
    if (popupAdvance) {
      setPopupAdvance(false);
      window.setTimeout(() => advance(), 120);
    }
  }, [advance, popupAdvance]);

  const handleAnswer = useCallback((choice) => {
    if (!current || popupOpen || endOpen) return;
    pickNewTopMessage();

    if (choice === current.correct) {
      showFlash();
      const delta = choice === 'middle' ? 3 : 2;
      makeFly({ type: 'points', icon: WORLD1_TASK1.pointsIcon, delta: `+${delta}` });
      setCorrectCount((v) => v + 1);
      window.setTimeout(() => setPoints((v) => v + delta), 420);
      window.setTimeout(() => advance(), 620);
      return;
    }

    setPopupText(current.wrongFeedback || 'NOT QUITE. THINK AGAIN.');
    setPopupAdvance(true);
    setPopupOpen(true);
  }, [advance, current, endOpen, makeFly, pickNewTopMessage, popupOpen, showFlash]);

  const handleWhy = useCallback(() => {
    if (!current || popupOpen || endOpen) return;
    const nextCount = whyUsesRef.current + 1;
    whyUsesRef.current = nextCount >= 3 ? 0 : nextCount;

    if (nextCount >= 3) {
      showFlash();
      makeFly({ type: 'curiosity', icon: WORLD1_TASK1.curiosityIcon, delta: '+5' });
      window.setTimeout(() => setCuriosityPoints((v) => v + 5), 420);
    }

    setPopupText(current.why || 'HERE IS WHY THIS MATTERS.');
    setPopupAdvance(false);
    setPopupOpen(true);
  }, [current, endOpen, makeFly, popupOpen, showFlash]);

  const earnedBadges = useMemo(() => {
    const badges = [resolveSkillBadge(correctCount)];
    if (curiosityPoints >= 5) badges.push({ id: 'curiosity', src: WORLD1_TASK1.badges.curiosity });
    return badges;
  }, [correctCount, curiosityPoints]);

  return (
    <GameplayShell backgroundUrl={WORLD1_TASK1.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD1_TASK1.pointsIcon}
        curiosityIcon={WORLD1_TASK1.curiosityIcon}
        pointsTargetRef={pointsTargetRef}
        curiosityTargetRef={curiosityTargetRef}
        pulsePoints={pulsePoints}
        pulseCuriosity={pulseCuriosity}
      />

      <div style={{ display: 'grid', gap: '22px', justifyItems: 'center', alignContent: 'center', minHeight: 'calc(100dvh - 140px)' }}>
        <QuestionCard cardRef={cardRef} text={current?.text || ''} whyIcon={WORLD1_TASK1.whyIcon} onWhy={handleWhy} />
        <AnswerButtonsV1
          answers={[
            { key: 'correct', image: WORLD1_TASK1.answerButtons.correct, label: 'Correct', onClick: () => handleAnswer('correct') },
            { key: 'middle', image: WORLD1_TASK1.answerButtons.middle, label: 'Warning', onClick: () => handleAnswer('middle') },
            { key: 'wrong', image: WORLD1_TASK1.answerButtons.wrong, label: 'Wrong', onClick: () => handleAnswer('wrong') },
          ]}
        />
      </div>

      <FlyItemsLayer items={flyItems} />
      <CorrectFlash open={flashOpen} label="CORRECT" />
      <InfoModal open={popupOpen} onClose={closePopup} text={popupText} />
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
          { label: 'GO TO TASK 2', onClick: () => navigate(NEXT_TASK_ROUTE, { state: player }) },
        ]}
      />
    </GameplayShell>
  );
}
