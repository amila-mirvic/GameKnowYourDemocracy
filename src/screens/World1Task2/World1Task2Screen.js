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
import { WORLD1_FEEDBACK_MESSAGES, WORLD1_TASK2 } from '../../game/content/world1Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';

const MAIN_MENU_ROUTE = '/world-1';
const NEXT_TASK_ROUTE = '/world-1/task-3-intro';
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const resolveSkillBadge = (points) => {
  if (points <= 10) return { id: 'beginner', src: WORLD1_TASK2.badges.beginner };
  if (points <= 20) return { id: 'advanced', src: WORLD1_TASK2.badges.advanced };
  return { id: 'expert', src: WORLD1_TASK2.badges.expert };
};

export default function World1Task2Screen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toString().toUpperCase();
  const [phase, setPhase] = useState('match');
  const [topMessage, setTopMessage] = useState(`${nameUpper} KEEP GOING`);
  const [points, setPoints] = useState(0);
  const [curiosityPoints] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [popupAdvance, setPopupAdvance] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioLocked, setScenarioLocked] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const pointsTargetRef = useRef(null);
  const curiosityTargetRef = useRef(null);
  const cardRef = useRef(null);
  const [flyItems, setFlyItems] = useState([]);
  const flyIdRef = useRef(0);
  const [pulsePoints, setPulsePoints] = useState(false);
  const [pulseCuriosity, setPulseCuriosity] = useState(false);

  useEffect(() => setTopMessage(`${nameUpper} KEEP GOING`), [nameUpper]);

  const backgroundUrl = phase === 'match' ? WORLD1_TASK2.backgrounds.match : WORLD1_TASK2.backgrounds.routes;
  const currentCard = WORLD1_TASK2.cards[cardIndex];
  const currentScenario = WORLD1_TASK2.scenarios[scenarioIndex];

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
      fromY: fromRect.top + fromRect.height * 0.3,
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

  const showFlash = useCallback(() => {
    setFlashOpen(true);
    window.setTimeout(() => setFlashOpen(false), 520);
  }, []);

  const advanceCard = useCallback(() => {
    setCardIndex((prev) => {
      const next = prev + 1;
      if (next >= WORLD1_TASK2.cards.length) {
        setPhase('routes');
        return prev;
      }
      return next;
    });
  }, []);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
    setPopupText('');
    if (popupAdvance) {
      setPopupAdvance(false);
      window.setTimeout(() => advanceCard(), 120);
    }
  }, [advanceCard, popupAdvance]);

  const handlePickLevel = useCallback((level) => {
    if (!currentCard || popupOpen || endOpen || phase !== 'match') return;
    pickNewTopMessage();
    if (level === currentCard.correct) {
      const delta = level === 'MIXED' ? 3 : 2;
      showFlash();
      makeFly({ type: 'points', icon: WORLD1_TASK2.pointsIcon, delta: `+${delta}` });
      window.setTimeout(() => setPoints((v) => v + delta), 420);
      window.setTimeout(() => advanceCard(), 620);
      return;
    }
    setPopupText(`CORRECT ANSWER:
${currentCard.correct}`);
    setPopupAdvance(true);
    setPopupOpen(true);
  }, [advanceCard, currentCard, endOpen, makeFly, phase, pickNewTopMessage, popupOpen, showFlash]);

  const saveResults = useCallback((taskPoints, taskCuriosity, badges) => {
    safeWrite('yd_world1_task2', { points: taskPoints, curiosityPoints: taskCuriosity, badges, finishedAt: Date.now() });
    safeWrite('yd_world1_task2_done', true);
    if (!safeRead('yd_world1_task2_counted')) {
      const prev = safeRead('yd_scores', { totalPoints: 0, totalCuriosityPoints: 0, badges: [] });
      safeWrite('yd_scores', {
        totalPoints: (prev.totalPoints || 0) + taskPoints,
        totalCuriosityPoints: (prev.totalCuriosityPoints || 0) + taskCuriosity,
        badges: [...(prev.badges || []), ...badges],
      });
      safeWrite('yd_world1_task2_counted', true);
    }
  }, []);

  const finishTask = useCallback(() => {
    const capped = clamp(points, 0, 30);
    const badges = [resolveSkillBadge(capped)];
    saveResults(capped, curiosityPoints, badges);
    setEndOpen(true);
  }, [curiosityPoints, points, saveResults]);

  const handlePickScenario = useCallback((option) => {
    if (!currentScenario || popupOpen || endOpen || scenarioLocked || phase !== 'routes') return;
    pickNewTopMessage();
    setScenarioLocked(true);

    if (option.points > 0) {
      showFlash();
      makeFly({ type: 'points', icon: WORLD1_TASK2.pointsIcon, delta: `+${option.points}` });
      window.setTimeout(() => setPoints((v) => v + option.points), 420);
    } else {
      setPopupText(`BEST ANSWER:
${currentScenario.options.find((opt) => opt.isBest)?.label || '—'}`);
      setPopupOpen(true);
    }

    window.setTimeout(() => {
      setScenarioIndex((prev) => {
        const next = prev + 1;
        if (next >= WORLD1_TASK2.scenarios.length) {
          window.setTimeout(() => finishTask(), 80);
          return prev;
        }
        return next;
      });
      setScenarioLocked(false);
    }, 900);
  }, [currentScenario, endOpen, finishTask, makeFly, phase, pickNewTopMessage, popupOpen, scenarioLocked, showFlash]);

  const earnedBadges = useMemo(() => [resolveSkillBadge(clamp(points, 0, 30))], [points]);

  return (
    <GameplayShell backgroundUrl={backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD1_TASK2.pointsIcon}
        curiosityIcon={WORLD1_TASK2.curiosityIcon}
        pointsTargetRef={pointsTargetRef}
        curiosityTargetRef={curiosityTargetRef}
        pulsePoints={pulsePoints}
        pulseCuriosity={pulseCuriosity}
      />

      <div style={{ display: 'grid', gap: '22px', justifyItems: 'center', alignContent: 'center', minHeight: 'calc(100dvh - 140px)' }}>
        {phase === 'match' ? (
          <>
            <QuestionCard
              cardRef={cardRef}
              title={`CARD ${cardIndex + 1} / ${WORLD1_TASK2.cards.length}`}
              text={currentCard?.text || ''}
              whyIcon={WORLD1_TASK2.whyIcon}
              onWhy={() => {
                setPopupText(`MATCH EACH DECISION CARD TO THE LEVEL WHERE IT IS MAINLY DECIDED.

SOME DECISIONS ARE SHARED — THOSE HAVE A SPECIAL OPTION.

DEMOCRATIC SKILL = KNOWING:
• WHO DECIDES
• WHO INFLUENCES
• WHERE PRESSURE WORKS BEST`);
                setPopupOpen(true);
              }}
            />
            <QuizAnswerGrid answers={WORLD1_TASK2.levelOptions.map((level, idx) => ({
              key: String.fromCharCode(65 + idx),
              label: level,
              onClick: () => handlePickLevel(level),
            }))} />
          </>
        ) : (
          <>
            <QuestionCard
              cardRef={cardRef}
              title={currentScenario?.title || ''}
              text={'CHOOSE THE MOST EFFECTIVE FIRST ACTION'}
            />
            <QuizAnswerGrid answers={(currentScenario?.options || []).map((option) => ({
              key: option.key,
              label: option.label,
              onClick: () => handlePickScenario(option),
              disabled: scenarioLocked,
            }))} />
          </>
        )}
      </div>

      <FlyItemsLayer items={flyItems} />
      <CorrectFlash open={flashOpen} label="CORRECT" />
      <InfoModal open={popupOpen} onClose={closePopup} text={popupText} />
      <TaskCompletionModal
        open={endOpen}
        onClose={() => navigate(MAIN_MENU_ROUTE, { state: player })}
        title={`BRAVO ${nameUpper} YOU NAILED IT!`}
        stats={[
          { label: 'POINTS', value: clamp(points, 0, 30) },
          { label: 'CURIOSITY POINTS', value: curiosityPoints },
        ]}
        badges={earnedBadges}
        actions={[
          { label: 'GO BACK TO MAIN MENU', onClick: () => navigate(MAIN_MENU_ROUTE, { state: player }) },
          { label: 'GO TO TASK 3', onClick: () => navigate(NEXT_TASK_ROUTE, { state: player }) },
        ]}
      />
    </GameplayShell>
  );
}
