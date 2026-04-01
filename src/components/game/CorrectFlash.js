import React from 'react';
import styles from './CorrectFlash.module.css';

export default function CorrectFlash({ open, label = 'CORRECT' }) {
  if (!open) return null;
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.box}>{label}</div>
    </div>
  );
}
