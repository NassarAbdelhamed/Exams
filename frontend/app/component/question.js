'use client';
import { useState } from 'react';
import './questions.css';

export default function Question({
  questionNumber,
  questionId,
  header,
  correct,
  wrong1,
  wrong2,
  wrong3,
  onAnswerSelect,
  showResult,
  correctAnswer,
  selectedAnswers
}) {
  const [shuffledAnswers] = useState(() => {
    const answers = [correct, wrong1, wrong2, wrong3];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  });

  const selectedAnswer = selectedAnswers[questionId];

  return (
    <div className={`question-container ${showResult ? 'review-mode' : ''}`}>
      <h3>
        <span className="question-number">{questionNumber}.</span> {header}
      </h3>
      <div>
        {shuffledAnswers.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          const isSelected = selectedAnswer === answer;
          const isWrong = showResult && isSelected && !isCorrect;

          return (
            <label
              key={index}
              className={`answer-option ${showResult && isCorrect ? 'correct-answer' : ''} ${isWrong ? 'wrong-answer' : ''}`}
            >
              <input
                type="radio"
                name={`answer-${questionId}`}
                value={answer}
                onChange={() => onAnswerSelect(questionId, answer)}
                disabled={showResult}
                checked={isSelected}
              />
              {answer}
              {showResult && isCorrect && (
                <span className="correct-answer-label"> ✅ Correct Answer</span>
              )}
              {isWrong && (
                <span className="correct-answer-label"> ❌ Your Answer</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
