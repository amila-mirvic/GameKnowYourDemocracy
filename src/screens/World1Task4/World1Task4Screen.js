import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CorrectFlash from '../../components/game/CorrectFlash';
import GameplayShell from '../../components/game/GameplayShell';
import InfoModal from '../../components/game/InfoModal';
import QuestionCard from '../../components/game/QuestionCard';
import QuizAnswerGrid from '../../components/game/QuizAnswerGrid';
import TaskCompletionModal from '../../components/game/TaskCompletionModal';
import TaskTopBar from '../../components/game/TaskTopBar';
import {
  WORLD1_FEEDBACK_MESSAGES,
  WORLD1_TASK4,
  WORLD1_VALUE_OPTIONS,
} from '../../game/content/world1Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead, safeWrite } from '../../game/utils/storage';
import styles from './World1Task4Screen.module.css';

const MAIN_MENU_ROUTE = '/world-1';

const resolveSkillBadge = (correctActions) =>
  correctActions <= 1
    ? { id: 'beginner', src: WORLD1_TASK4.badges.beginner }
    : correctActions <= 3
      ? { id: 'advanced', src: WORLD1_TASK4.badges.advanced }
      : { id: 'expert', src: WORLD1_TASK4.badges.expert };

const buildValueOptions = (correctValue) =>
  WORLD1_VALUE_OPTIONS.map((label, index) => ({
    key: String.fromCharCode(65 + index),
    label,
    correct: label === correctValue,
  }));

export default function World1Task4Screen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const nameUpper = (player?.name || 'PLAYER').toString().toUpperCase();

  const [topMessage, setTopMessage] = useState(`${nameUpper} KEEP GOING`);
  const [points, setPoints] = useState(0);
  const [curiosityPoints] = useState(0);
  const [correctActions, setCorrectActions] = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = WORLD1_TASK4.scenes[sceneIndex];
  const valueOptions = useMemo(() => buildValueOptions(scene?.correctValue), [scene?.correctValue]);
  const [actionCorrect, setActionCorrect] = useState(false);
  const [actionPicked, setActionPicked] = useState(false);
  const [valuePicked, setValuePicked] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupText, setPopupText] = useState('');
  const [popupOnClose, setPopupOnClose] = useState(null);
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
          WORLD1_FEEDBACK_MESSAGES[
            Math.floor(Math.random() * WORLD1_FEEDBACK_MESSAGES.length)
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

  const saveResults = useCallback(
    (taskPoints, taskCuriosity, badges) => {
      safeWrite('yd_world1_task4', {
        points: taskPoints,
        curiosityPoints: taskCuriosity,
        badges,
        correctActions,
        totalScenes: WORLD1_TASK4.scenes.length,
        finishedAt: Date.now(),
      });

      safeWrite('yd_world1_task4_done', true);

      if (!safeRead('yd_world1_task4_counted')) {
        const prev = safeRead('yd_scores', {
          totalPoints: 0,
          totalCuriosityPoints: 0,
          badges: [],
        });

        safeWrite('yd_scores', {
          totalPoints: (prev.totalPoints || 0) + taskPoints,
          totalCuriosityPoints: (prev.totalCuriosityPoints || 0) + taskCuriosity,
          badges: [...(prev.badges || []), ...badges],
        });

        safeWrite('yd_world1_task4_counted', true);
      }
    },
    [correctActions]
  );

  const finishTask = useCallback(() => {
    const badges = [resolveSkillBadge(correctActions)];
    saveResults(points, curiosityPoints, badges);
    setEndOpen(true);
  }, [correctActions, curiosityPoints, points, saveResults]);

  const resetSceneState = useCallback(() => {
    setActionCorrect(false);
    setActionPicked(false);
    setValuePicked(false);
  }, []);

  useEffect(() => {
    resetSceneState();
  }, [sceneIndex, resetSceneState]);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
    setPopupTitle('');
    setPopupText('');
    const fn = popupOnClose;
    setPopupOnClose(null);

    if (typeof fn === 'function') {
      window.setTimeout(fn, 80);
    }
  }, [popupOnClose]);

  const advanceScene = useCallback(() => {
    setSceneIndex((prev) => {
      const next = prev + 1;

      if (next >= WORLD1_TASK4.scenes.length) {
        window.setTimeout(() => finishTask(), 100);
        return prev;
      }

      return next;
    });
  }, [finishTask]);

  const handlePickAction = useCallback(
    (option) => {
      if (!scene || popupOpen || endOpen || actionPicked) return;

      pickTopMessage();

      if (!option.correct) {
        const correct = scene.actionOptions.find((x) => x.correct);
        setPopupTitle('CORRECT ANSWER');
        setPopupText(correct ? correct.label : '—');
        setPopupOnClose(() => () => {
          setActionPicked(true);
          setActionCorrect(true);
        });
        setPopupOpen(true);
        return;
      }

      setActionPicked(true);
      setActionCorrect(true);
      setCorrectActions((v) => v + 1);
      showFlash();
      window.setTimeout(() => setPoints((v) => v + 4), 420);
    },
    [actionPicked, endOpen, pickTopMessage, popupOpen, scene, showFlash]
  );

  const handlePickValue = useCallback(
    (option) => {
      if (!scene || popupOpen || endOpen || !actionCorrect || valuePicked) return;

      pickTopMessage();
      setValuePicked(true);

      if (option.correct) {
        showFlash();
        window.setTimeout(() => setPoints((v) => v + 1.5), 420);
        window.setTimeout(() => advanceScene(), 680);
        return;
      }

      setPopupTitle('CORRECT ANSWER');
      setPopupText(scene.correctValue);
      setPopupOnClose(() => () => advanceScene());
      setPopupOpen(true);
    },
    [actionCorrect, advanceScene, endOpen, pickTopMessage, popupOpen, scene, showFlash, valuePicked]
  );

  const fmt = useCallback((n) => {
    const s = Number(n || 0).toFixed(1);
    return s.endsWith('.0') ? s.slice(0, -2) : s;
  }, []);

  const earnedBadges = useMemo(() => [resolveSkillBadge(correctActions)], [correctActions]);

  return (
    <GameplayShell backgroundUrl={WORLD1_TASK4.backgroundUrl}>
      <TaskTopBar
        message={topMessage}
        points={points}
        curiosityPoints={curiosityPoints}
        pointsIcon={WORLD1_TASK4.pointsIcon}
        curiosityIcon={WORLD1_TASK4.curiosityIcon}
        formatValue={fmt}
      />

      <div className={styles.pageBody}>
        <div className={styles.stage}>
          <QuestionCard
            title={scene?.title}
            text={scene?.statement || ''}
          />

          <div className={styles.dualQuizWrap}>
            <div className={styles.quizColumn}>
              <QuizAnswerGrid
                equalRows
                answers={(scene?.actionOptions || []).map((option) => ({
                  key: option.key,
                  label: option.label,
                  onClick: () => handlePickAction(option),
                  disabled: actionPicked || popupOpen || endOpen,
                }))}
              />
            </div>

            <div className={styles.quizColumn}>
              <QuizAnswerGrid
                equalRows
                answers={valueOptions.map((option) => ({
                  key: option.key,
                  label: option.label,
                  onClick: () => handlePickValue(option),
                  disabled: !actionCorrect || valuePicked || popupOpen || endOpen,
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      <CorrectFlash open={flashOpen} label="CORRECT" />

      <InfoModal
        open={popupOpen}
        onClose={closePopup}
        title={popupTitle}
        text={popupText}
      />

      <TaskCompletionModal
        open={endOpen}
        onClose={() => navigate(MAIN_MENU_ROUTE, { state: player })}
        title={`BRAVO ${nameUpper} YOU NAILED IT!`}
        stats={[
          { label: 'POINTS', value: fmt(points) },
          { label: 'CURIOSITY POINTS', value: fmt(curiosityPoints) },
        ]}
        badges={earnedBadges}
        actions={[
          {
            label: 'GO BACK TO MAIN MENU',
            onClick: () => navigate(MAIN_MENU_ROUTE, { state: player }),
          },
        ]}
      />
    </GameplayShell>
  );
}