import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AchievementsPanel from '../../components/game/AchievementsPanel';
import TaskSelectorItem from '../../components/game/TaskSelectorItem';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead } from '../../game/utils/storage';
import styles from './World1TaskSelectorScreen.module.css';

export default function World1TaskSelectorScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);

  const scores = useMemo(() => safeRead('yd_scores', {}), []);
  const achievementIcon = `${process.env.PUBLIC_URL}/ui/medal.svg`;
  const bgUrl = `${process.env.PUBLIC_URL}/worlds/world1.png`;
  const characterSrc =
    player?.character === 'male'
      ? `${process.env.PUBLIC_URL}/world1/taskselector/male.png`
      : `${process.env.PUBLIC_URL}/world1/taskselector/female.png`;

  const achPanelRef = useRef(null);
  const achBtnRef = useRef(null);
  const [achOpen, setAchOpen] = useState(false);

  useEffect(() => {
    const onDown = (event) => {
      if (!achOpen) return;
      const panel = achPanelRef.current;
      const button = achBtnRef.current;
      if (panel && !panel.contains(event.target) && button && !button.contains(event.target)) {
        setAchOpen(false);
      }
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [achOpen]);

  const resolveBadgeSrc = useCallback((badge) => {
    if (!badge) return '';
    if (typeof badge === 'string') return badge;
    if (typeof badge?.src === 'string') return badge.src;
    return '';
  }, []);

  const tasks = [
    { key: '1', image: `${process.env.PUBLIC_URL}/world1/task1.png`, label: 'START TASK 1', route: '/world-1/task-1-intro', pulse: true },
    { key: '2', image: `${process.env.PUBLIC_URL}/world1/task2.png`, label: 'START TASK 2', route: '/world-1/task-2-intro' },
    { key: '3', image: `${process.env.PUBLIC_URL}/world1/task3.png`, label: 'START TASK 3', route: '/world-1/task-3-intro' },
    { key: '4', image: `${process.env.PUBLIC_URL}/world1/task4.png`, label: 'START TASK 4', route: '/world-1/task-4-intro' },
  ];

  return (
    <div className={styles.screen} style={{ '--bg': `url(${bgUrl})`, backgroundImage: `url(${bgUrl})` }}>
      <div className={styles.overlay}>
        <button
          ref={achBtnRef}
          type="button"
          className={styles.achBtn}
          onClick={() => setAchOpen((value) => !value)}
          aria-label="Achievements"
          aria-expanded={achOpen ? 'true' : 'false'}
        >
          <img src={achievementIcon} alt="" className={styles.achIcon} />
        </button>

        <AchievementsPanel
          open={achOpen}
          panelRef={achPanelRef}
          scores={scores}
          resolveBadgeSrc={resolveBadgeSrc}
        />

        <div className={styles.taskRail}>
          {tasks.map((task) => (
            <TaskSelectorItem
              key={task.key}
              image={task.image}
              alt={`Task ${task.key}`}
              buttonLabel={task.label}
              pulsing={task.pulse}
              onClick={() => navigate(task.route, { state: player })}
            />
          ))}
        </div>

        <div className={styles.characterWrap} aria-hidden="true">
          <img src={characterSrc} alt="" className={styles.characterImg} />
        </div>
      </div>
    </div>
  );
}
