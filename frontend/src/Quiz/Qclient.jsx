import React, { useEffect, useState } from 'react';
import '../styles/quiz.css';
import Sidebar from '../components/Sidebar';
import '../App.css'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Qclient = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(cookies)
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const verifyCookie = async () => {
    console.log(cookies)
    if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
      console.log(cookies)
      removeCookie("token")
      navigate("/")
    }
    const { data } = await axios.post(
      "http://localhost:4000/api/admin",
      {},
      { withCredentials: true }
    );
    const { status, user } = data;

    setUsername(user.username);
    return status
      ? /* toast(`Hello ${user.username}`, {
          position: "top-right",
        }) */console.log(cookies)
      : (removeCookie("token"), navigate("/admin/login"));
  };


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
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">

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

        </div>
      </div>
    </div>


  );
};

export default Qclient;
