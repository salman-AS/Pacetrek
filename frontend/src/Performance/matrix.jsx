import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref'
import Chart from 'chart.js/auto';
import './matrix.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/sidebar2';

const PerformanceMatrix = () => {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername, usernameRef] = useState("");
    const [student, setStudent, studentRef] = useState({});


    const [marks, setMarks, marksRef] = useState({
        code: 0,
        aptitude: 0,
        coursework: 0
    })

    const [testsData, setTestsData, testsDataRef] = useState([
        { id: 1, type: 'Coding', marks: marksRef.current.code },
        { id: 2, type: 'Aptitude Reasoning', marks: marksRef.current.aptitude },
        { id: 3, type: 'Course Work', marks: marksRef.current.coursework }
    ]);


    useEffect(() => {
        console.log(cookies)
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const verifyCookie = async () => {
        console.log(cookies)
        // if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
        //     console.log(cookies)
        //     removeCookie("token")
        //     navigate("/")
        // }
        const { data } = await axios.post(
            "http://localhost:4000/api/student",
            {},
            { withCredentials: true }
        );
        const { status, student, user } = data;
        setUsername(user.username)
        const newStudent = data.student
        // console.log(newStudent)
        setStudent(newStudent);
        // console.log(newStudent.code.reduce((acc, obj) => acc += obj.mark, 0))
        setMarks({
            code: (studentRef.current.code.reduce((acc, obj) => acc += obj.mark, 0)),
            aptitude: (studentRef.current.aptitude.reduce((acc, obj) => acc += obj.mark, 0)),
            coursework: (studentRef.current.coursework.reduce((acc, obj) => acc += obj.mark, 0))
        })
        // console.log(marksRef.current)
        setTestsData([
            { id: 1, type: 'Coding', marks: (studentRef.current.code.reduce((acc, obj) => acc += obj.mark, 0)) },
            { id: 2, type: 'Aptitude Reasoning', marks: (studentRef.current.aptitude.reduce((acc, obj) => acc += obj.mark, 0)) },
            { id: 3, type: 'Course Work', marks: (studentRef.current.coursework.reduce((acc, obj) => acc += obj.mark, 0)) }
        ])
        // console.log(testsDataRef.current)
        return status
            ? /* toast(`Hello ${user}`, {
            position: "top-right",
	    }) */console.log(cookies, 'here')
            : (removeCookie("token")/* , navigate("/student/login") */);
    };

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    const setFunction = async () => {
        const { data } = await axios.post(
            "http://localhost:4000/api/student",
            {},
            { withCredentials: true }
        );
        const { status, student, user } = data;
        const newStudent = data.student
        // console.log(newStudent)
        setStudent(newStudent);
        // console.log(newStudent.code.reduce((acc, obj) => acc += obj.mark, 0))
        setMarks({
            code: (studentRef.current.code.reduce((acc, obj) => acc += obj.mark, 0)),
            aptitude: (studentRef.current.aptitude.reduce((acc, obj) => acc += obj.mark, 0)),
            coursework: (studentRef.current.coursework.reduce((acc, obj) => acc += obj.mark, 0))
        })
        // console.log(marksRef.current)
        setTestsData([
            { id: 1, type: 'Coding', marks: (studentRef.current.code.reduce((acc, obj) => acc += obj.mark, 0)) },
            { id: 2, type: 'Aptitude Reasoning', marks: (studentRef.current.aptitude.reduce((acc, obj) => acc += obj.mark, 0)) },
            { id: 3, type: 'Course Work', marks: (studentRef.current.coursework.reduce((acc, obj) => acc += obj.mark, 0)) }
        ])
        console.log(testsDataRef.current[0])


        const testsDataCopy = JSON.parse(JSON.stringify(testsDataRef))
        console.log(testsData, testsDataRef, testsDataRef.current[0])
        const marksByType = {
            Coding: testsDataRef.current[0].marks,
            "Aptitude Reasoning": testsDataRef.current[1].marks,
            "Course Work": testsDataRef.current[2].marks
        }

        console.log(marksByType, testsDataCopy, testsDataRef.current[0])

        {
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
        }
    }

    useEffect(() => {

        setFunction()

        // const marksByType = testsDataRef.current.reduce((acc, test) => {
        //     if (!acc[test.type]) {
        //         acc[test.type] = 0;
        //     }
        //     acc[test.type] += test.marks;
        //     return acc;
        // }, {});


    }, []);

    useEffect(() => {
        let myChart
        if (myChart) {
            destroyChart()
        }
        if (chartRef.current && chartData) {
            myChart = new Chart(chartRef.current, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            myChart.update()
            console.log(myChart, chartRef)
        }
        function destroyChart() {
        myChart.destroy();
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
