import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar2";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Button, Space, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import { IoVideocam } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

const QList = ({ option }) => {

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
        if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
            console.log(cookies)
            removeCookie("token")
            navigate("/")
        }
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
            if (option === 'code')
                setData(data.codes)
            else
                setData(documents)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
        console.log(data)
    }, [])

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    const handleCheckboxChange = async (codeId, difficulty) => {
        console.log(codeId)
        const mark = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 75 : 100
        const newCode = {
            id: codeId,
            mark
        }
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/student/postCode/${student._id}`,
                {
                    ...newCode
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
        } catch (error) {
            console.log(error)
        }
    }


    if (option === 'code')
        return (
            <div className="dashboard-body">
                <div className='dashboard'>
                    <Sidebar />
                    <div className="dashboard--contents">

                        <h1 className="table-heading">Coding challenges</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="table-header">Completed?</th>
                                    <th className="table-header">Challenge</th>
                                    <th className="table-header">Video Solution</th>
                                    <th className="table-header">Difficulty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => (
                                    <tr key={item._id}>
                                        <td className="table-cell">
                                            <input type="checkbox" name={item.title} id={item._id} defaultChecked={student.code.map(item => item.id).includes(item._id)} onChange={() => handleCheckboxChange(item._id, item.difficulty)} />
                                        </td>
                                        <td className="table-cell"><Link to={item.lcLink} target="_blank">{item.title}</Link></td>
                                        <td className="table-cell">
                                            <Link to={item.ytLink} target="_blank"><IoVideocam /></Link>
                                        </td>
                                        <td className="table-cell">
                                            <Tag color={item.difficulty === 'easy' ? 'green' : item.difficulty === 'medium' ? 'yellow' : 'red'}>{item.difficulty.toUpperCase()}</Tag>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <ToastContainer />
                </div>
            </div>
        )

    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboard--contents">

                    <h1 className="table-heading">{option === 'aptitude' ? 'Aptitude quizzes' : 'Coursework quizzes'}</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header">Title</th>
                                <th className="table-header"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td className="table-cell">{item.title}</td>
                                    <td className="table-cell">
                                        <Link to={`/student/${option}/${item._id}`} target="_blank">Open</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default QList