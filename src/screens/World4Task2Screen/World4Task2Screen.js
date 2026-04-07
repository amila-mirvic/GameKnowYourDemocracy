import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CorrectFlash from '../../components/game/CorrectFlash';
import FlyItemsLayer from '../../components/game/FlyItemsLayer';
import GameplayShell from '../../components/game/GameplayShell';
import InfoModal from '../../components/game/InfoModal';
import MatchAnswerGrid from '../../components/game/MatchAnswerGrid';
import QuestionCard from '../../components/game/QuestionCard';
import TaskCompletionModal from '../../components/game/TaskCompletionModal';
import TaskTopBar from '../../components/game/TaskTopBar';
import { WORLD4_FEEDBACK_MESSAGES, WORLD4_TASK2 } from '../../game/content/world4Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';

const MAIN_MENU_ROUTE = '/world-4';
const NEXT_TASK_ROUTE = '/world-4/task-3-intro';

const resolveSkillBadge = (points) => {
  if (points <= 6) return { id: 'beginner', src: WORLD4_TASK2.badges.beginner };
  if (points <= 12) return { id: 'advanced', src: WORLD4_TASK2.badges.advanced };
  return { id: 'expert', src: WORLD4_TASK2.badges.expert };
};

function buildWrongAnswerText(payload, roundFeedback) {
  const attempts = payload?.attempts || [];
  const correctAnswers = payload?.correctAnswers || [];

  const wrongAttempts = attempts.filter((entry) => !entry.isCorrect);

  const wrongText =
    wrongAttempts.length > 0
      ? wrongAttempts
          .map(
            (entry) =>
              `FOR "${entry.leftLabel}" THE CORRECT TARGET IS:\n${entry.correctRightLabel}`
          )
          .join('\n\n')
      : 'NOT QUITE.';

  const allCorrectMatches = correctAnswers
    .map((item) => `${item.leftLabel} → ${item.rightLabel}`)
    .join('\n');

  return `${wrongText}\n\nCORRECT MATCHES:\n${allCorrectMatches}${roundFeedback ? `\n\n${roundFeedback}` : ''}`;
}

export default function World4Task2Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toUpperCase();

  const [roundIndex, setRoundIndex] = useState(0);
  const current = WORLD4_TASK2.rounds?.[roundIndex] || null;

  const [points, setPoints] = useState(0);
  const [curiosityPoints] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [topMessage, setTopMessage] = useState(`${nameUpper} THINK ABOUT POWER`);
  const [endOpen, setEndOpen] = useState(false);
  const [roundLocked, setRoundLocked] = useState(false);

  const pointsTargetRef = useRef(null);
  const curiosityTargetRef = useRef(null);
  const cardRef = useRef(null);
  const [flyItems, setFlyItems] = useState([]);
  const flyIdRef = useRef(0);
  const [pulsePoints, setPulsePoints] = useState(false);
  const [pulseCuriosity] = useState(false);

  useEffect(() => {
    setTopMessage(`${nameUpper} THINK ABOUT POWER`);
  }, [nameUpper]);

  useEffect(() => {
    setRoundLocked(false);
  }, [roundIndex]);

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
    safeWrite('yd_world4_task2', {
      points: taskPoints,
      curiosityPoints: 0,
      badges,
      totalRounds: WORLD4_TASK2.rounds.length,
      finishedAt: Date.now(),
    });

    if (!safeRead('yd_world4_task2_counted')) {
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

      safeWrite('yd_world4_task2_counted', true);
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
      if (next >= WORLD4_TASK2.rounds.length) {
        window.setTimeout(() => finishTask(), 120);
        return prev;
      }
      return next;
    });
  }, [finishTask]);

  const handleRoundResolved = useCallback(
    (payload) => {
      if (!current || roundLocked || modalOpen || endOpen) return;

      setRoundLocked(true);
      pickTopMessage();

      if (payload?.isPerfect) {
        const earned = current.pairs.length * 3;

        showFlash();
        makeFly({
          type: 'points',
          icon: WORLD4_TASK2.pointsIcon,
          delta: `+${earned}`,
        });

        window.setTimeout(() => setPoints((v) => v + earned), 320);
        window.setTimeout(() => nextRound(), 850);
        return;
      }

      setModalText(buildWrongAnswerText(payload, current.feedback));
      setModalOpen(true);

      window.setTimeout(() => {
        setModalOpen(false);
        nextRound();
      }, 1300);
    },
    [current, endOpen, makeFly, modalOpen, nextRound, pickTopMessage, roundLocked, showFlash]
  );

  const earnedBadges = useMemo(() => [resolveSkillBadge(points)], [points]);

  return (
    <GameplayShell backgroundUrl={WORLD4_TASK2.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD4_TASK2.pointsIcon}
        curiosityIcon={WORLD4_TASK2.curiosityIcon}
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
          text={current?.prompt || 'Match each issue with the most relevant target.'}
          whyIcon={WORLD4_TASK2.whyIcon}
          onWhy={() => {
            setModalText(
              'Think about who actually has the power to influence the issue and make change happen.'
            );
            setModalOpen(true);
          }}
        />

        <MatchAnswerGrid
          key={current?.id}
          leftItems={(current?.pairs || []).map((pair) => ({
            key: pair.barrierId,
            label: pair.barrier,
          }))}
          rightItems={(current?.solutions || []).map((solution) => ({
            key: solution.id,
            label: solution.label,
          }))}
          matches={Object.fromEntries((current?.pairs || []).map((pair) => [pair.barrierId, pair.correctSolutionId]))}
          disabled={modalOpen || endOpen || roundLocked}
          onRoundResolved={handleRoundResolved}
        />
      </div>

      <FlyItemsLayer items={flyItems} />
      <CorrectFlash open={flashOpen} label="NICE MATCH" />
      <InfoModal open={modalOpen} onClose={() => setModalOpen(false)} text={modalText} />

      <TaskCompletionModal
        open={endOpen}
        onClose={() => navigate(MAIN_MENU_ROUTE, { state: player })}
        title={`BRAVO ${nameUpper} YOU TARGETED THE RIGHT ACTORS!`}
        stats={[
          { label: 'POINTS', value: points },
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