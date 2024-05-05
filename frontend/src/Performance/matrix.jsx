import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './matrix.css';

const testsData = [
    { id: 1, type: 'Coding', marks: 85 },
    { id: 2, type: 'Aptitude Reasoning', marks: 78 },
    { id: 3, type: 'Course Work', marks: 92 },
    { id: 4, type: 'Coding', marks: 80 },
    // Add more test data as needed
];

const PerformanceMatrix = () => {
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
    );
};

export default PerformanceMatrix;
