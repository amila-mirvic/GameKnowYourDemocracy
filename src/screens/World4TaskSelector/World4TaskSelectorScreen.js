import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AchievementsPanel from '../../components/game/AchievementsPanel';
import TaskSelectorItem from '../../components/game/TaskSelectorItem';
import { getPlayerFromLocationState } from '../../game/utils/player';
import { safeRead } from '../../game/utils/storage';
import styles from '../World2TaskSelector/World2TaskSelectorScreen.module.css';

export default function World4TaskSelectorScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);

  const scores = useMemo(() => safeRead('yd_scores', {}), []);
  const achievementIcon = `${process.env.PUBLIC_URL}/ui/medal.svg`;
  const bgUrl = `${process.env.PUBLIC_URL}/world4/w4bg.png`;

  const achPanelRef = useRef(null);
  const achBtnRef = useRef(null);
  const [achOpen, setAchOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1025);

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

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const resolveBadgeSrc = useCallback((badge) => {
    if (!badge) return '';
    if (typeof badge === 'string') return badge;
    if (typeof badge?.src === 'string') return badge.src;
    return '';
  }, []);

  const tasks = [
    {
      key: '1',
      image: `${process.env.PUBLIC_URL}/world4/task1.png`,
      label: 'START TASK 1',
      route: '/world-4/task-1-intro',
      pulse: false,
    },
    {
      key: '2',
      image: `${process.env.PUBLIC_URL}/world4/task2.png`,
      label: 'START TASK 2',
      route: '/world-4/task-2-intro',
      pulse: false,
    },
    {
      key: '3',
      image: `${process.env.PUBLIC_URL}/world4/task3.png`,
      label: 'START TASK 3',
      route: '/world-4/task-3-intro',
      pulse: false,
    },
    {
      key: '4',
      image: `${process.env.PUBLIC_URL}/world4/task4.png`,
      label: 'START TASK 4',
      route: '/world-4/task-4-intro',
      pulse: false,
    },
  ];

  const desktopRailStyle = isDesktop
    ? {
        position: 'absolute',
        left: '50%',
        top: '54%',
        transform: 'translate(-50%, -50%)',
        width: 'min(980px, calc(100vw - 140px))',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))',
        justifyItems: 'center',
        alignItems: 'start',
        columnGap: '110px',
        rowGap: '34px',
        zIndex: 10,
      }
    : {};

  const mobileRailStyle = !isDesktop
    ? {
        width: '90%',
        maxWidth: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        zIndex: 10,
        marginTop: '8px',
        flex: 1,
        minHeight: 0,
        justifyContent: 'center',
      }
    : {};

  const itemWrapStyle = isDesktop
    ? {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }
    : {};

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

        <div style={{ ...mobileRailStyle, ...desktopRailStyle }}>
          {tasks.map((task) => (
            <div key={task.key} style={itemWrapStyle}>
              <TaskSelectorItem
                image={task.image}
                alt={`Task ${task.key}`}
                buttonLabel={task.label}
                pulsing={task.pulse}
                onClick={() => navigate(task.route, { state: player })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}