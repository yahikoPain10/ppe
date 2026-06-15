import React, { useState } from 'react';
import styles from './styles.module.css';

// Tiny helper: turns **bold** into <strong>bold</strong>
function renderBold(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function normalize(str) {
  return String(str).trim().toLowerCase().replace(/\s+/g, '');
}

export default function AdressesCouleursQuiz({ questions = [] }) {
  const [selected, setSelected] = useState({}); // { [questionIndex]: optionValue }
  const [checked, setChecked] = useState(false);

  const select = (qIndex, option) => {
    setSelected((prev) => ({ ...prev, [qIndex]: option }));
    setChecked(false);
  };

  const check = () => setChecked(true);

  const score = questions.reduce(
    (acc, q, i) => acc + (normalize(selected[i]) === normalize(q.answer) ? 1 : 0),
    0
  );

  return (
    <div className={styles.quiz}>

      {questions.map((q, i) => {
        const userAnswer = selected[i];
        return (
          <div className={styles.question} key={i}>
            <p className={styles.questionText}>
              <strong>{i + 1}.</strong> {renderBold(q.question)}
            </p>

            <div className={styles.optionsGrid}>
              {q.options.map((opt) => {
                const isSelected = userAnswer === opt;
                const isCorrectOpt = normalize(opt) === normalize(q.answer);

                let optionClass = styles.option;
                if (isSelected) optionClass += ` ${styles.optionSelected}`;
                if (checked && isCorrectOpt) optionClass += ` ${styles.optionCorrect}`;
                if (checked && isSelected && !isCorrectOpt) optionClass += ` ${styles.optionIncorrect}`;

                return (
                  <button
                    key={opt}
                    type="button"
                    className={optionClass}
                    onClick={() => select(i, opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className={styles.footer}>
        <button className={styles.checkButton} onClick={check}>
          Vérifier
        </button>
        {checked && (
          <span className={styles.score}>
            Score : {score} / {questions.length}
          </span>
        )}
      </div>
    </div>
  );
}