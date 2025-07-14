// app/component/question.js
import { useState } from 'react';

export default function Question({ header, correct, wrong1, wrong2, wrong3 }) {
  // Combine all answers and shuffle them
  const [shuffledAnswers] = useState(() => {
    const answers = [correct, wrong1, wrong2, wrong3];
    // Fisher-Yates shuffle algorithm
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  });

  return (
    <div >
      <h3 >{header}</h3>
      <div>
        {shuffledAnswers.map((answer, index) => (
          <label key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="radio" 
              name={`answer-${header}`} 
              value={answer}
              style={{ marginRight: '10px' }}
            />
            {answer}
          </label>
        ))}
      </div>
    </div>
  );
}