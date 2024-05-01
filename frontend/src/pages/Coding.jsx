import React, { useEffect, useState } from 'react'; // Import the CSS file
import '../styles/quiz.css';
import Sidebar from '../components/Sidebar';
import '../App.css'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Button, Flex, Space, Table, Tag } from 'antd';
import Link from 'antd/es/typography/Link';
import { BiSolidVideo } from 'react-icons/bi';
const { Column } = Table;

const Coding = () => {
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
            ? console.log(cookies)
            : (removeCookie("token"), navigate("/admin/login"));
    };

    const [title, setTitle] = useState('')
    const [lcLink, setLcLink] = useState('')
    const [ytLink, setYtLink] = useState('')
    const [difficulty, setDifficulty] = useState('')

    const handleSubmit = async (e) => {
        // Add logic for handling upload
        e.preventDefault();
        const code = {
            title,
            lcLink,
            ytLink,
            difficulty
        }
        console.log(code)
        try {
            const { data } = await axios.post(
                `http://localhost:4000/api/code/add`,
                {
                    ...code,
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
        console.log('here')
        setTitle('')
        setLcLink('')
        setYtLink('')
        setDifficulty('')
        getCodes()
    };



    const remove = async (id) => {
        console.log(id)
        try {
            const { data } = await axios.delete(
                `http://localhost:4000/api/code/delete/${id}`,
                {},
                { withCredentials: true }
            );
            const { success, message, codes } = data;
            console.log(data)
        } catch (error) {
            console.log(error);
        }
        getCodes()
    }

    const [data, setData] = useState([])

    const getCodes = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:4000/api/code/getAll`,
                {},
                { withCredentials: true }
            );
            const { success, message, codes } = data;
            console.log(data)
            setData(codes)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCodes()
        console.log(data)
    }, [])

    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />
                <Flex vertical className="dashboard--contents">

                    <div className="quiz-container">
                        <form onSubmit={handleSubmit}>
                            <h1 className="quiz-title">Add Coding Challenges</h1>
                            <label htmlFor='title' className="question-number">Title</label>
                            <input
                                name='title'
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Title"
                                required
                            />
                            <label htmlFor='lcLink' className="question-number">Link to Leetcode</label>
                            <input
                                name='lcLink'
                                type="url"
                                value={lcLink}
                                onChange={(e) => setLcLink(e.target.value)}
                                placeholder="Enter Link to Leetcode"
                                required
                            />
                            <label htmlFor='ytLink' className="question-number">Link to solution</label>
                            <input
                                name='ytLink'
                                type="url"
                                value={ytLink}
                                onChange={(e) => setYtLink(e.target.value)}
                                placeholder="Enter Link to solution"
                                required
                            />
                            <label htmlFor='difficulty' className="question-number">Difficulty</label>
                            <select id="difficulty" name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                                <option value=''>Select Difficulty</option>
                                <option value='easy'>Easy</option>
                                <option value='medium'>Medium</option>
                                <option value='hard'>Hard</option>
                            </select>
                            <div className="upload-container">
                                <button type="submit" className="upload-button">Upload</button>
                            </div>
                        </form>
                    </div>
                    <div className='CodeTable'>
                        <Table dataSource={data} className='table'>
                            <Column title="Title" key="title" render={(key) => {
                                return (
                                    <Link href={key.lcLink}>
                                        {key.title}
                                    </Link>
                                );
                            }}/>
                            <Column title="Video Solution" className='center' dataIndex="ytLink" key="ytLink" render={(ytLink) => {
                                return (
                                    <Link href={ytLink}>
                                        <BiSolidVideo size={30}/>
                                    </Link>
                                );
                            }}/>
                            <Column
                                title="Difficulty"
                                dataIndex="difficulty"
                                key="difficulty"
                                render={(difficulty) => {
                                    console.log(difficulty)
                                    let color = (difficulty === 'easy' ? 'green' : (difficulty === 'medium' ? 'yellow' : 'red'))
                                    return (
                                        <Tag color={color} key={difficulty}>
                                            {difficulty.toUpperCase()}
                                        </Tag>
                                    );
                                }}
                            />
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

export default Coding;
