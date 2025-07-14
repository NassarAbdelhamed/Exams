import { useState } from 'react';
import './questions.css';

export default function Question({ header, correct, wrong1, wrong2, wrong3 }) {
  const [shuffledAnswers] = useState(() => {
    const answers = [correct, wrong1, wrong2, wrong3];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  });

  return (
    <div className="question-container">
      <h3>{header}</h3>
      <div>
        {shuffledAnswers.map((answer, index) => (
          <label key={index} className="answer-option">
            <input 
              type="radio" 
              name={`answer-${header}`} 
              value={answer}
            />
            {answer}
          </label>
        ))}
      </div>
    </div>
  );
}
