import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "./style.css"

const TestPage = ({ option }) => {

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [student, setStudent] = useState({});

  useEffect(() => {
    console.log(cookies)
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const verifyCookie = async () => {
    console.log(cookies)
    // if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
    //   console.log(cookies)
    //   removeCookie("token")
    //   navigate("/")
    // }
    const { data } = await axios.post(
      "http://localhost:4000/api/student",
      {},
      { withCredentials: true }
    );
    const { status, student, user } = data;

    console.log(data)
    setStudent(student)
    setUsername(user.username);

    return status
      ? /* toast(`Hello ${user}`, {
      position: "top-right",
  }) */console.log(cookies, 'here')
      : (removeCookie("token")/* , navigate("/student/login") */);
  };

  const [data, setData] = useState({
    id: null,
    title: null,
    questions: [{
      question: null,
      options: [],
      correctAnswer: null,
      _id: null
    }]
  })
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers,] = useState([])
  const [crctanswers, setCrctanswers] = useState([])

  const getData = async () => {
    try {
      console.log(id)
      const { data } = await axios.get(
        `http://localhost:4000/api/${option}/get/${id}`,
        {},
        { withCredentials: true }
      );
      const { success, message, document } = data;
      console.log(data)
      const updatedData = {
        id: document._id,
        title: document.title,
        questions: document.questions /* [{
          question: null,
          options: [],
          correctAnswer: null,
          id: null
        }] */
      }
      console.log('here', document, updatedData);
      setData(updatedData)
      setQuestions(updatedData.questions)
      const answers = questions.map(item => item.correctAnswer)
      setCrctanswers(answers)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getData()
    console.log('hereeeeeeeeeeeeeeee', data)
  }, [data, questions, answers, crctanswers])

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('here')
    let mark = 0
    crctanswers.forEach((item, index) => {
      if (answers[index] === item)
        mark = mark + 1
    })
    try {
      const sendData = {
        id, mark
      }
      const { data } = await axios.put(
        `http://localhost:4000/api/student/post${option}/${student._id}`,
        {
          ...sendData
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(data)
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }

      // window.open("about:blank", "_self");
      setTimeout(() => {
        alert('Your mark is ' + mark + ' out of ' + crctanswers.length)
        window.close();
      }, 5000);
    } catch (error) {
      console.log(error)
    }
  }

  const handleRadioChange = (value, index) => {
    console.log(index, value)
    console.log(answers)
    answers[index] = value
    console.log(answers)
    setAnswers(answers)
    console.log(answers, crctanswers)
  };

  return (
    <div>
      <div id="testContainer">
        <form onSubmit={handleSubmit}>
          <h2>{data.title}</h2>
          <div id="questions" key={data.id}>
            {questions.map((item, index) => {
              return (
                <div key={item._id} className='question'>
                  <h3>{item.question}</h3>
                  <div className='options' key={item._id}>
                    {item.options.map((option, i) =>
                      <>
                        <label key={i} htmlFor={i}>
                          <input type="radio" value={option} id={i} checked={answers[index] === option} onChange={() => handleRadioChange(option, index)} /> {option}
                        </label>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TestPage;
