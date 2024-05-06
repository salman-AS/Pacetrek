import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Result() {
  const { topic } = useParams();
  const { answers, questions } = window.history.state;

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      const correctAnswer = questions[i].correctAnswer;
      const userAnswer = answers[questions[i].id];
      if (userAnswer === correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const score = calculateScore();

  return (
    <div>
      <h1>Result</h1>
      <p>Your score: {score} / {questions.length}</p>
      <h2>Correct Answers:</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <p>{question.text}</p>
            <p>Correct Answer: {question.correctAnswer}</p>
          </li>
        ))}
      </ul>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default Result;
