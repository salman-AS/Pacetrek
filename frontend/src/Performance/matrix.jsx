import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './matrix.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/sidebar2';

const PerformanceMatrix = () => {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [student, setStudent] = useState({});

    const [marks, setMarks] = useState({ code: 0, aptitude: 0, coursework: 0 })

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

        setMarks({
            code: (student.code.reduce((acc, obj) => { acc += obj.mark }, 0)),
            aptitude: (student.aptitude.reduce((acc, obj) => { acc += obj.mark }, 0)),
            coursework: (student.coursework.reduce((acc, obj) => { acc += obj.mark }, 0))
        })

        return status
            ? /* toast(`Hello ${user}`, {
	        position: "top-right",
	    }) */console.log(cookies,'here')
            : (removeCookie("token")/* , navigate("/student/login") */);
    };


    const testsData = [
        { id: 1, type: 'Coding', marks: marks.code || 33 },
        { id: 2, type: 'Aptitude Reasoning', marks: marks.aptitude || 33 },
        { id: 3, type: 'Course Work', marks: marks.coursework || 34 },
        // { id: 4, type: 'Coding', student.code.reduce((acc, obj) => {acc+=obj.mark} ,0) },
        // Add more test data as needed
    ];

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const marksByType = testsData.reduce((acc, test) => {
            if (!acc[test.type]) {
                acc[test.type] = 0;
            }
            acc[test.type] += test.marks;
            return acc;
        }, {});

        const data = {
            labels: Object.keys(marksByType),
            datasets: [{
                label: 'Total Marks',
                data: Object.values(marksByType),
                backgroundColor: [
                    'rgba(135, 206, 235, 0.6)',   // Sky Blue
                    'rgba(77, 77, 77, 0.6)',       // Darker Grey
                    'rgba(0, 0, 128, 0.6)'        // Navy Blue
                ]
            }]
        };


        setChartData(data);
    }, []);

    useEffect(() => {
        if (chartRef.current && chartData) {
            new Chart(chartRef.current, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [chartData]);

    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboard--contents">
                    <div className="container">
                        <div className="chart-container">
                            <canvas ref={chartRef} />
                        </div>
                        {testsData.map((test, index) => (
                            <div key={index} className="test-container">
                                <h3>Test {test.id}</h3>
                                <p><strong>Test Type:</strong> {test.type}</p>
                                <p><strong>Marks Obtained:</strong> {test.marks}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMatrix;
