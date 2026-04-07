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
import { WORLD4_FEEDBACK_MESSAGES, WORLD4_TASK4 } from '../../game/content/world4Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';

const MAIN_MENU_ROUTE = '/world-4';

const resolveSkillBadge = (points) => {
  if (points <= 8) return { id: 'beginner', src: WORLD4_TASK4.badges.beginner };
  if (points <= 18) return { id: 'advanced', src: WORLD4_TASK4.badges.advanced };
  return { id: 'expert', src: WORLD4_TASK4.badges.expert };
};

function getOutcomeText(score) {
  if (score >= 24) {
    return "STRONG PATH — The decision is reconsidered. A dialogue process begins. The youth center may stay open or be adapted.";
  }

  if (score >= 14) {
    return "MEDIUM PATH — The issue gains attention, but no clear outcome is achieved yet.";
  }

  return "WEAK PATH — The issue fades. The decision is implemented without change.";
}

export default function World4Task4Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toUpperCase();

  const [stepIndex, setStepIndex] = useState(0);
  const current = WORLD4_TASK4.steps?.[stepIndex] || null;
  const [points, setPoints] = useState(0);
  const [finalPoints, setFinalPoints] = useState(0);
  const [curiosityPoints] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [topMessage, setTopMessage] = useState(`${nameUpper} PUSH FOR IMPACT`);
  const [endOpen, setEndOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [locked, setLocked] = useState(false);

  const pointsTargetRef = useRef(null);
  const curiosityTargetRef = useRef(null);
  const cardRef = useRef(null);
  const [flyItems, setFlyItems] = useState([]);
  const flyIdRef = useRef(0);
  const [pulsePoints, setPulsePoints] = useState(false);
  const [pulseCuriosity] = useState(false);

  useEffect(() => {
    setTopMessage(`${nameUpper} PUSH FOR IMPACT`);
  }, [nameUpper]);

  useEffect(() => {
    setLocked(false);
  }, [stepIndex]);

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
    safeWrite('yd_world4_task4', {
      points: taskPoints,
      curiosityPoints: 0,
      badges,
      totalSteps: WORLD4_TASK4.steps.length,
      finishedAt: Date.now(),
    });

    if (!safeRead('yd_world4_task4_counted')) {
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

      safeWrite('yd_world4_task4_counted', true);
    }
  }, []);

  const finishTask = useCallback(
    (score) => {
      const skillBadge = resolveSkillBadge(score);
      const worldBadge = {
        id: 'world4-completion',
        src: WORLD4_TASK4.worldCompletionBadge,
      };

      const badges = [skillBadge, worldBadge];
      saveResults(score, badges);
      setFinalPoints(score);
      setSummary(`${getOutcomeText(score)}\n\n${WORLD4_TASK4.finalMessage}`);
      setEndOpen(true);
    },
    [saveResults]
  );

  const handleOption = useCallback(
    (option) => {
      if (!current || modalOpen || endOpen || locked) return;

      setLocked(true);
      pickTopMessage();

      const isCorrect = (current.correct || []).includes(option.key);
      const gained = isCorrect ? option.points || 0 : 0;
      const nextTotal = points + gained;
      const isLast = stepIndex === WORLD4_TASK4.steps.length - 1;

      if (gained > 0) {
        makeFly({
          type: 'points',
          icon: WORLD4_TASK4.pointsIcon,
          delta: `+${gained}`,
        });
      }

      if (isCorrect) {
        showFlash();
        window.setTimeout(() => {
          if (gained > 0) {
            setPoints(nextTotal);
          }

          if (isLast) {
            finishTask(nextTotal);
          } else {
            setStepIndex((prev) => prev + 1);
          }
        }, 850);
        return;
      }

      const correctLabel =
        (current.options || []).find((item) => (current.correct || []).includes(item.key))?.label || '';

      setModalText(
        `NOT THE BEST STRATEGY.\n\nCORRECT ANSWER:\n${correctLabel}\n\n${current.feedback || ''}`
      );
      setModalOpen(true);

      window.setTimeout(() => {
        setModalOpen(false);

        if (isLast) {
          finishTask(nextTotal);
        } else {
          setStepIndex((prev) => prev + 1);
        }
      }, 1000);
    },
    [current, endOpen, finishTask, locked, makeFly, modalOpen, pickTopMessage, points, showFlash, stepIndex]
  );

  const displayPoints = endOpen ? finalPoints : points;
  const earnedBadges = useMemo(
    () => [resolveSkillBadge(displayPoints), { id: 'world4-completion', src: WORLD4_TASK4.worldCompletionBadge }],
    [displayPoints]
  );

  return (
    <GameplayShell backgroundUrl={WORLD4_TASK4.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={displayPoints}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD4_TASK4.pointsIcon}
        curiosityIcon={WORLD4_TASK4.curiosityIcon}
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
      <CorrectFlash open={flashOpen} label="STRONG MOVE" />
      <InfoModal open={modalOpen} onClose={() => setModalOpen(false)} text={modalText} />

      <TaskCompletionModal
        open={endOpen}
        onClose={() => navigate(MAIN_MENU_ROUTE, { state: player })}
        title={`BRAVO ${nameUpper} YOU COMPLETED WORLD 4!`}
        stats={[
          { label: 'POINTS', value: displayPoints },
          { label: 'CURIOSITY POINTS', value: curiosityPoints },
          { label: 'OUTCOME', value: summary },
        ]}
        badges={earnedBadges}
        actions={[
          { label: 'GO BACK TO MAIN MENU', onClick: () => navigate(MAIN_MENU_ROUTE, { state: player }) },
          { label: 'GO TO WORLD SELECT', onClick: () => navigate('/world-select', { state: player }) },
        ]}
      />
    </GameplayShell>
  );
}