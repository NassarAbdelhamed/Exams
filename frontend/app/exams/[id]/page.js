'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './page.css';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/find/${params.id}`);
        if (!response.ok) throw new Error('Request failed');
        const result = await response.json();
        setData(Array.isArray(result) ? result : [result]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      const answers = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      const response = await fetch('http://localhost:5000/check-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) throw new Error('Failed to check answers');
      const result = await response.json();
      setResults(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResolve = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleReview = () => {
    setReviewing(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || data.length === 0) return <div>No questions found</div>;

  return (
    <div className="page-container">
      {(!results || reviewing) &&
        data.map((q) => (
          <Question 
            key={q._id}
            questionId={q._id}
            header={q.header}
            correct={q.correct}
            wrong1={q.wrong1}
            wrong2={q.wrong2}
            wrong3={q.wrong3}
            onAnswerSelect={handleAnswerSelect}
            showResult={results !== null}
            correctAnswer={results?.details?.find(r => r.questionId === q._id)?.correctAnswer}
            selectedAnswers={selectedAnswers}
          />
        ))
      }

      {/* Results summary after submit */}
      {results && !reviewing && (
        <div className="results-container animate-fade">
          <h3>Results</h3>
          <p>Score: {results.score}</p>
          <p>Percentage: {results.percentage}%</p>
          <ul className="results-list">
            {results.details.map((result, index) => (
              <li
                key={index}
                className={result.correct ? 'correct' : 'incorrect'}
              >
                Question {index + 1}: {result.correct ? 'Correct' : 'Incorrect'}
                {!result.correct && (
                  <span className="correct-answer-hint">
                    (Correct answer: {result.correctAnswer})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Button section */}
      <div className="button-group">
        {!results && (
          <button className="submit-button" onClick={handleSubmit}>
            Submit Answers
          </button>
        )}

        {results && !reviewing && (
          <button className="review-button" onClick={handleReview}>
            Review Answers
          </button>
        )}

        {results && (
          <>
            <button className="home-button" onClick={handleGoHome}>
              Go Home
            </button>
            <button className="resolve-button" onClick={handleResolve}>
              Resolve Exam
            </button>
          </>
        )}
      </div>
    </div>
  );
}


function Question({ questionId, header, correct, wrong1, wrong2, wrong3, onAnswerSelect, showResult, correctAnswer, selectedAnswers }) {
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
        {shuffledAnswers.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          const isSelected = selectedAnswers?.[questionId] === answer;
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
            </label>
          );
        })}
      </div>
    </div>
  );
}
