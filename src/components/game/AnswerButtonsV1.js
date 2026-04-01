import React from 'react';
import styles from './AnswerButtonsV1.module.css';

export default function AnswerButtonsV1({ answers }) {
  return (
    <div className={styles.row}>
      {answers.map((answer) => (
        <button
          key={answer.key}
          type="button"
          className={styles.button}
          onClick={answer.onClick}
          disabled={answer.disabled}
        >
          {answer.image ? <img src={answer.image} alt={answer.label || answer.key} /> : answer.label}
        </button>
      ))}
    </div>
  );
}
