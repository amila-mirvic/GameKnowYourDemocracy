import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CorrectFlash from '../../components/game/CorrectFlash';
import FlyItemsLayer from '../../components/game/FlyItemsLayer';
import GameplayShell from '../../components/game/GameplayShell';
import InfoModal from '../../components/game/InfoModal';
import QuestionCard from '../../components/game/QuestionCard';
import QuizAnswerGridMultiple from '../../components/game/QuizAnswerGridMultiple';
import TaskTopBar from '../../components/game/TaskTopBar';
import { WORLD3_FEEDBACK_MESSAGES, WORLD3_TASK4 } from '../../game/content/world3Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';

const OUTRO_ROUTE = '/world-3/task-4-outro';

const resolveSkillBadge = (points) => {
  if (points <= 8) return { id: 'beginner', src: WORLD3_TASK4.badges.beginner };
  if (points <= 18) return { id: 'advanced', src: WORLD3_TASK4.badges.advanced };
  return { id: 'expert', src: WORLD3_TASK4.badges.expert };
};

function getCorrectKeys(step) {
  if (!step) return [];
  if (Array.isArray(step.correct)) return step.correct;
  return (step.options || []).filter((option) => option.correct).map((option) => option.key);
}

function getCorrectAnswerLabels(step) {
  const correctKeys = getCorrectKeys(step);
  return (step.options || [])
    .filter((option) => correctKeys.includes(option.key))
    .map((option) => option.label);
}

export default function World3Task4Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toUpperCase();

  const [stepIndex, setStepIndex] = useState(0);
  const current = WORLD3_TASK4.steps?.[stepIndex] || null;
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [points, setPoints] = useState(0);
  const [curiosityPoints] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [topMessage, setTopMessage] = useState(`${nameUpper} KEEP GOING`);

  const pointsTargetRef = useRef(null);
  const curiosityTargetRef = useRef(null);
  const cardRef = useRef(null);
  const [flyItems, setFlyItems] = useState([]);
  const flyIdRef = useRef(0);
  const [pulsePoints, setPulsePoints] = useState(false);
  const [pulseCuriosity] = useState(false);

  useEffect(() => {
    setTopMessage(`${nameUpper} KEEP GOING`);
  }, [nameUpper]);

  useEffect(() => {
    setSelectedKeys([]);
  }, [stepIndex]);

  const pickTopMessage = useCallback(() => {
    setTopMessage((prev) => {
      let next = prev;
      let guard = 0;
      while (next === prev && guard < 10) {
        next =
          WORLD3_FEEDBACK_MESSAGES[
            Math.floor(Math.random() * WORLD3_FEEDBACK_MESSAGES.length)
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
    safeWrite('yd_world3_task4', {
      points: taskPoints,
      curiosityPoints: 0,
      badges,
      totalSteps: WORLD3_TASK4.steps.length,
      finishedAt: Date.now(),
    });

    if (!safeRead('yd_world3_task4_counted')) {
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

      safeWrite('yd_world3_task4_counted', true);
    }
  }, []);

  const finishTask = useCallback(
    (score) => {
      const skillBadge = resolveSkillBadge(score);
      const citizenBadge = {
        id: 'active-citizen-badge',
        src: `${process.env.PUBLIC_URL}/world3/citizenbadge.png`,
      };

      saveResults(score, [skillBadge, citizenBadge]);

      navigate(OUTRO_ROUTE, {
        state: {
          ...player,
          world3Task4Points: score,
          world3Task4Badges: [skillBadge, citizenBadge],
          citizenBadge,
        },
      });
    },
    [navigate, player, saveResults]
  );

  const handleToggle = useCallback(
    (key) => {
      if (!current || modalOpen) return;

      setSelectedKeys((prev) => {
        if (prev.includes(key)) {
          return prev.filter((item) => item !== key);
        }

        return [...prev, key];
      });
    },
    [current, modalOpen]
  );

  const handleSubmit = useCallback(() => {
    if (!current || selectedKeys.length === 0 || modalOpen) return;

    pickTopMessage();

    const correctKeys = getCorrectKeys(current);
    const correctLabels = getCorrectAnswerLabels(current);

    const correctSelected = selectedKeys.filter((key) => correctKeys.includes(key));
    const wrongSelected = selectedKeys.filter((key) => !correctKeys.includes(key));

    const allCorrect =
      wrongSelected.length === 0 && correctSelected.length === correctKeys.length;

    const stepPointsFromOptions =
      (current.options || [])
        .filter((option) => correctSelected.includes(option.key))
        .reduce((sum, option) => sum + (option.points || 0), 0);

    const fallbackPoints =
      current.multi === false
        ? allCorrect
          ? 4
          : 0
        : correctSelected.length * 2;

    const gained = allCorrect
      ? stepPointsFromOptions > 0
        ? stepPointsFromOptions
        : fallbackPoints
      : 0;

    const nextTotal = points + gained;
    const isLast = stepIndex === WORLD3_TASK4.steps.length - 1;

    if (allCorrect) {
      showFlash();

      makeFly({
        type: 'points',
        icon: WORLD3_TASK4.pointsIcon,
        delta: `+${gained}`,
      });

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

    setModalText(
      `NOT THE BEST STRATEGY.\n\nCORRECT ANSWER${correctLabels.length > 1 ? 'S' : ''}:\n${correctLabels.join('\n')}`
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
  }, [
    current,
    finishTask,
    makeFly,
    modalOpen,
    pickTopMessage,
    points,
    selectedKeys,
    showFlash,
    stepIndex,
  ]);

  return (
    <GameplayShell backgroundUrl={WORLD3_TASK4.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD3_TASK4.pointsIcon}
        curiosityIcon={WORLD3_TASK4.curiosityIcon}
        pointsTargetRef={pointsTargetRef}
        curiosityTargetRef={curiosityTargetRef}
        pulsePoints={pulsePoints}
        pulseCuriosity={pulseCuriosity}
      />

      <div
        style={{
          display: 'grid',
          gap: '22px',
          justifyItems: 'center',
          alignContent: 'center',
          minHeight: 'calc(100dvh - 140px)',
          padding: '12px 16px 22px',
        }}
      >
        <QuestionCard
          cardRef={cardRef}
          title={current?.title || ''}
          text={current?.text || current?.statement || ''}
        />

        <QuizAnswerGridMultiple
          answers={(current?.options || []).map((option) => ({
            key: option.key,
            label: option.label,
          }))}
          selectedKeys={selectedKeys}
          onToggle={handleToggle}
          onSubmit={handleSubmit}
          disabled={modalOpen}
          submitLabel={current?.submitLabel || 'CONFIRM'}
          helperText="YOU CAN SELECT MULTIPLE ANSWERS"
        />
      </div>

      <FlyItemsLayer items={flyItems} />
      <CorrectFlash open={flashOpen} label="STRONG MOVE" />
      <InfoModal open={modalOpen} onClose={() => setModalOpen(false)} text={modalText} />
    </GameplayShell>
  );
}