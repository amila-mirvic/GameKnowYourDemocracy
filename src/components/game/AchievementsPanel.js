import React from 'react';
import styles from './AchievementsPanel.module.css';

export default function AchievementsPanel({ open, panelRef, scores, resolveBadgeSrc }) {
  if (!open) return null;
  const badges = Array.isArray(scores.badges) ? scores.badges : [];
  return (
    <div ref={panelRef} className={styles.panel} role="dialog" aria-modal="false">
      <div className={styles.row}>
        <span className={styles.label}>TOTAL POINTS</span>
        <span className={styles.value}>{scores.totalPoints || 0}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>TOTAL CURIOSITY</span>
        <span className={styles.value}>{scores.totalCuriosityPoints || 0}</span>
      </div>
      <div className={styles.subTitle}>MY BADGES</div>
      <div className={styles.badges}>
        {badges.length ? badges.map((badge, index) => (
          <img key={(badge?.id || badge?.src || badge || index) + '_' + index} src={resolveBadgeSrc(badge)} alt="" className={styles.badge} loading="lazy" />
        )) : <div className={styles.empty}>No badges yet.</div>}
      </div>
    </div>
  );
}
