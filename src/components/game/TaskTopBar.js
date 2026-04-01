import React from 'react';
import styles from './TaskTopBar.module.css';

export default function TaskTopBar({
  message,
  points,
  curiosityPoints,
  pointsIcon,
  curiosityIcon,
  pointsTargetRef,
  curiosityTargetRef,
  pulsePoints,
  pulseCuriosity,
  formatValue,
}) {
  const fmt = typeof formatValue === 'function' ? formatValue : (v) => v;
  return (
    <div className={styles.bar}>
      <div className={styles.message}>{message}</div>
      <div className={styles.stats}>
        <div className={[styles.stat, pulsePoints ? styles.pulse : ''].join(' ')}>
          <img ref={pointsTargetRef} src={pointsIcon} alt="Points" className={styles.icon} />
          <div className={styles.value}>{fmt(points)}</div>
        </div>
        <div className={[styles.stat, pulseCuriosity ? styles.pulse : ''].join(' ')}>
          <img ref={curiosityTargetRef} src={curiosityIcon} alt="Curiosity points" className={styles.icon} />
          <div className={styles.value}>{fmt(curiosityPoints)}</div>
        </div>
      </div>
    </div>
  );
}
