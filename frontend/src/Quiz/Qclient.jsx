import React, { useState } from 'react'; // Import the CSS file
import '../styles/quiz.css';

const Qclient = () => {
  const [questions, setQuestions] = useState([{ question: '', options: [''] }]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: [''] }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleUpload = () => {
    // Add logic for handling upload
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz</h1>
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <h4 className="question-number">Question {index + 1}</h4>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder="Enter question"
          />
          <button onClick={() => removeQuestion(index)}>Remove Question</button>
          <div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label className="option-label">{String.fromCharCode(65 + optionIndex)}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  placeholder={`Enter option ${String.fromCharCode(65 + optionIndex)}`}
                />
                <button onClick={() => removeOption(index, optionIndex)}>Remove Option</button>
              </div>
            ))}
            <button onClick={() => addOption(index)}>Add Option</button>
          </div>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <div className="upload-container">
        <button onClick={handleUpload} className="upload-button">Upload</button>
      </div>
    </div>
  );
};

export default Qclient;
