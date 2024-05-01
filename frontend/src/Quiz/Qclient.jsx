import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Flex, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import 'react-toastify/dist/ReactToastify.css'
import '../styles/quiz.css';
import '../App.css'

const Qclient = ({ option }) => {
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

  const [title, setTitle] = useState('')
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

  const handleSubmit = async (e) => {
    // Add logic for handling upload
    e.preventDefault();
    const aptitude = {
      title,
      questions
    }
    console.log(aptitude)
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/${option}/add`,
        {
          ...aptitude,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(data)
      if (success) {
        toast.success(message, {
          position: "bottom-left",
        })
      } else {
        toast.error(message, {
          position: "bottom-left",
        })
      }
    } catch (error) {
      console.log(error);
    }
    getData()
    setTitle('')
    setQuestions([{ question: '', options: [''] }])
  };

  const remove = async (id) => {
    console.log(id)
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/${option}/delete/${id}`,
        {},
        { withCredentials: true }
      );
      const { success, message, documents } = data;
      console.log(data)
    } catch (error) {
      console.log(error);
    }
    getData()
  }

  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/${option}/getAll`,
        {},
        { withCredentials: true }
      );
      const { success, message, documents } = data;
      console.log(data)
      setData(documents)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
    console.log(data)
  }, [])

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <Flex vertical className="dashboard--contents">

          <div className="quiz-container">
            <form onSubmit={handleSubmit}>
              <h1 className="quiz-title">{option.charAt(0).toUpperCase() + option.slice(1)}</h1>
              <h2 className="question-number">Title</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
                required
              />
              {questions.map((question, index) => (
                <div key={index} className="question-container">
                  <h4 className="question-number">Question {index + 1}</h4>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    placeholder="Enter question"
                    required
                  />
                  <button onClick={() => removeQuestion(index)}>Remove Question</button>
                  <button onClick={() => addOption(index)}>Add Option</button>
                  <div>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label className="option-label">{String.fromCharCode(65 + optionIndex)}</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                          placeholder={`Enter option ${String.fromCharCode(65 + optionIndex)}`}
                          required
                        />
                        <button onClick={() => removeOption(index, optionIndex)}>Remove Option</button>
                      </div>
                    ))}

                  </div>
                </div>
              ))}
              <button onClick={addQuestion}>Add Question</button>
              <div className="upload-container">
                <button type="submit" className="upload-button">Upload</button>
              </div>
            </form>
          </div>
          <div className='CodeTable'>
            <Table dataSource={data} className='table'>
              <Column title="Title" dataIndex="title" key="title"/>
              <Column
                title="Action"
                dataIndex="_id"
                key="_id"
                render={(_id) => (
                  <Space size="middle">
                    <Button danger type='primary' onClick={() => remove(_id)}>Delete</Button>
                  </Space>
                )}
              />
            </Table>
          </div>

        </Flex>
        <ToastContainer />
      </div>
    </div>


  );
};

export default Qclient;
