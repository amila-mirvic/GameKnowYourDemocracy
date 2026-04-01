import React from 'react';
import styles from './QuizAnswerGrid.module.css';

export default function QuizAnswerGrid({
  answers,
  className = '',
  equalRows = false,
}) {
  const classes = [
    styles.grid,
    equalRows ? styles.equalRows : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {answers.map((answer) => (
        <button
          key={answer.key}
          type="button"
          className={styles.button}
          onClick={answer.onClick}
          disabled={answer.disabled}
        >
          {answer.key ? <div className={styles.key}>{answer.key}</div> : null}
          <div className={styles.label}>{answer.label}</div>
        </button>
      ))}
    </div>
  );
}