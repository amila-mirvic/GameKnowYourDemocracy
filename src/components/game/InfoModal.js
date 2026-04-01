import React from 'react';
import styles from './InfoModal.module.css';

export default function InfoModal({ open, onClose, text, title }) {
  if (!open) return null;
  return (
    <div className={styles.backdrop} onMouseDown={onClose} role="presentation">
      <div className={styles.card} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">×</button>
        {title ? <div className={styles.title}>{title}</div> : null}
        <div className={styles.body}>{text}</div>
      </div>
    </div>
  );
}
