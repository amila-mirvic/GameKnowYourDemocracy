import React from 'react';
import styles from './QuestionCard.module.css';

export default function QuestionCard({ title, text, whyIcon, onWhy, cardRef }) {
  return (
    <div ref={cardRef} className={styles.card}>
      {onWhy ? (
        <button type="button" className={styles.whyBtn} onClick={onWhy} aria-label="Why">
          <img src={whyIcon} alt="Why" />
        </button>
      ) : null}
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.text}>{text}</div>
    </div>
  );
}
