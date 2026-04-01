import React from 'react';
import styles from './TaskCompletionModal.module.css';

export default function TaskCompletionModal({ open, onClose, title, stats = [], badges = [], actions = [] }) {
  if (!open) return null;
  return (
    <div className={styles.backdrop} role="presentation">
      <div className={styles.card} role="dialog" aria-modal="true">
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">×</button>
        <div className={styles.title}>{title}</div>

        <div className={styles.stats}>
          {stats.map((line) => (
            <div key={line.label} className={styles.statLine}>{`${line.label}: ${line.value}`}</div>
          ))}
        </div>

        <div className={styles.badges}>
          {badges.map((badge) => (
            <img key={badge.id} src={badge.src} alt={badge.id} className={styles.badge} />
          ))}
        </div>

        <div className={styles.actions}>
          {actions.map((action) => (
            <button key={action.label} type="button" className={styles.actionBtn} onClick={action.onClick}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
