import React from 'react';

export default function AnswerButtonsV2({ styles, answers = [] }) {
  return (
    <div className={styles.answerRowV2}>
      {answers.map((answer) => (
        <button
          key={answer.key}
          type="button"
          className={styles.answerBtnV2}
          onClick={answer.onClick}
          aria-label={answer.label}
          disabled={answer.disabled}
        >
          <img
            src={answer.image}
            alt={answer.label}
            className={styles.answerImgV2}
          />
        </button>
      ))}
    </div>
  );
}