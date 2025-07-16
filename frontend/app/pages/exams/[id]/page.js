'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Question from '@/app/component/question';
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
        const response = await fetch(`http://localhost:5000/questions/${params.id}`);
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
    if (!data || Object.keys(selectedAnswers).length !== data.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      const answers = data.map(q => ({
        questionId: q._id,
        answer: selectedAnswers[q._id]
      }));

      const response = await fetch('http://localhost:5000/exam/check-answers', {
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
      {/* Show questions if not submitted or if reviewing */}
      {(!results || reviewing) &&
        data.map((q, index) => (
          <Question
            key={q._id}
            questionNumber={index + 1}
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
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== data.length}
            title={
              Object.keys(selectedAnswers).length !== data.length
                ? 'Please answer all questions'
                : ''
            }
          >
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