import React from 'react';
import styles from './TaskSelectorItem.module.css';

export default function TaskSelectorItem({ image, alt, buttonLabel, onClick, pulsing = false }) {
  return (
    <div className={styles.item}>
      <button type="button" className={styles.iconWrap} onClick={onClick} aria-label={alt}>
        <img src={image} alt={alt} className={styles.icon} />
      </button>
      <button type="button" className={[styles.button, pulsing ? styles.pulse : ''].join(' ')} onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
}
