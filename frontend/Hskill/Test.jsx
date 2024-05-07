import React, { useState, useEffect } from 'react';

const TestPage = () => {
  // Test data
  const tests = {
    aptitude: [
      { question: "Question 1: What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
      { question: "Question 2: What is 3 * 4?", options: ["7", "10", "12", "15"], answer: "12" }
      // Add more questions as needed
    ],
    coursework: [
      { question: "Question 1: What is HTML?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" }
      // Add more questions as needed
    ],
    coding: [
      { question: "Question 1: What is JavaScript?", options: ["A programming language", "A markup language", "A styling language", "None of the above"], answer: "A programming language" }
      // Add more questions as needed
    ]
  };

  const [currentTest, setCurrentTest] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);

  // Load user's attended tests from local storage
  useEffect(() => {
    const attendedTests = JSON.parse(localStorage.getItem('attendedTests')) || {};
    setAttendedTests(attendedTests);
  }, []);

  const [attendedTests, setAttendedTests] = useState({});

  // Function to load test based on card clicked
  const loadTest = (topic) => {
    if (!attendedTests[topic]) {
      setCurrentTest(tests[topic]);
      setShowAnswers(false); // Reset showAnswers state when loading a new test
      setScore(null); // Reset score when loading a new test
    } else {
      alert('You have already attended this test.');
    }
  };

  // Function to submit the test
  const submitTest = () => {
    let totalScore = 0;
    let userScore = 0;
    currentTest.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption) {
        totalScore++;
        if (selectedOption.value === question.answer) {
          userScore++;
        }
      }
    });

    setScore({ userScore, totalScore });
    setShowAnswers(true);

    // Mark this test as attended
    setAttendedTests({ ...attendedTests, [currentTest[0].topic]: true });

    // Save attended tests to local storage
    localStorage.setItem('attendedTests', JSON.stringify({ ...attendedTests, [currentTest[0].topic]: true }));
  };

  return (
    <div>
      {/* Card 1: Aptitude Reasoning */}
      <div className="card" onClick={() => loadTest('aptitude')}>Aptitude Reasoning</div>

      {/* Card 2: Coursework */}
      <div className="card" onClick={() => loadTest('coursework')}>Coursework</div>

      {/* Card 3: Coding */}
      <div className="card" onClick={() => loadTest('coding')}>Coding</div>

      {/* Test Container (Initially Hidden) */}
      {currentTest && (
        <div id="testContainer">
          <h2>Test: {currentTest[0].question.split(":")[0]}</h2>
          <div id="questions">
            {currentTest.map((question, index) => (
              <div key={index}>
                <p>{question.question}</p>
                <div className="options">
                  {question.options.map((option, i) => (
                    <label key={i}>
                      <input type="radio" name={`question${index}`} value={option} disabled={showAnswers} />
                      {option}
                    </label>
                  ))}
                </div>
                {showAnswers && <p>Correct Answer: {question.answer}</p>}
              </div>
            ))}
          </div>
          {!showAnswers && <button onClick={submitTest}>Submit Test</button>}
        </div>
      )}

      {/* Card for Marks */}
      {score && (
        <div className="card">
          <h2>Mark</h2>
          <p>You scored {score.userScore} out of {score.totalScore}</p>
        </div>
      )}
    </div>
  );
};

export default TestPage;
