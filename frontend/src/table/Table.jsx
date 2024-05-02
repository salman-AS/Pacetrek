import React, { useEffect, useState } from "react";
import '../styles/Table.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Table = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        console.log(cookies)
        verifyCookie();
        getStudents();
    }, [cookies, navigate, removeCookie]);

    const getStudents = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:4000/api/student/getStudents",
                {},
                { withCredentials: true }
            )
            console.log(data)
            setStudents(data.students)
        } catch (error) {
            console.log(error)
        }
    }

    const getRank = async (id) => {
        let rank = 0
        try {
            const { data } = await axios.get(
                "http://localhost:4000/api/student/getStudents",
                {},
                { withCredentials: true }
            )
            const students = data.students
            const sortedStudents = students.sort((a, b) => {
                console.log(a.score, b.score)
                if (a.score > b.score)
                    return a;
                else
                    return b;
            }).map(student => student._id)
            const rankedStudents = sortedStudents.reverse()
            rank = rankedStudents.indexOf(id)+1
            console.log(rankedStudents)
        } catch (error) {
            console.log(error)
        }
        console.log(rank)
        return rank
    }
    

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

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        admissionNo: "",
        dob: "",
        phoneNo: "",
        year: "",
        cgpa: "",
        rank: "",
        dept: ""
    });

    const handleViewClick = async (student) => {
        // Set form data and show the modal
        // console.log(typeof(getRank(student._id)))
        let rank = await getRank(student._id)
        console.log(rank)
        setFormData({
            name: student.firstName + ' ' + student.lastName,
            email: student.email,
            admissionNo: student.admissionNo,
            dob: student.dob,
            phoneNo: student.phoneNo,
            year: student.year,
            dept: student.dept,
            cgpa: student.cgpa,
            rank: rank,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        // Close the modal
        setShowModal(false);
    };

    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboard--contents">

                    <div className="table-container">
                        <h1 className="table-heading">Student Evaluation Page</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="table-header">Admission No</th>
                                    <th className="table-header">Name</th>
                                    <th className="table-header">Year</th>
                                    <th className="table-header">Department</th>
                                    <th className="table-header">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student._id}>
                                        <td className="table-cell">{student.admissionNo}</td>
                                        <td className="table-cell">{student.firstName + ' ' + student.lastName}</td>
                                        <td className="table-cell">{student.year}</td>
                                        <td className="table-cell">{student.dept}</td>
                                        <td className="table-cell">
                                            <button className="table-button" onClick={() => handleViewClick(student)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Modal */}
                        {showModal && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={handleCloseModal}>&times;</span>
                                    <h2 className="modal-heading">Student Details</h2>
                                    <label className="modal-label">
                                        Name:
                                        <input type="text" value={formData.name} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        Admission Number:
                                        <input type="text" value={formData.admissionNo} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        DOB:
                                        <input type="text" value={formData.dob} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        Email:
                                        <input type="email" value={formData.email} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        Phone Number:
                                        <input type="text" value={formData.phoneNo} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        Year:
                                        <input type="text" value={formData.year} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        Department:
                                        <input type="text" value={formData.dept} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        CGPA:
                                        <input type="text" value={formData.cgpa} readOnly />
                                    </label>
                                    <label className="modal-label">
                                        Leaderboard Rank:
                                        <input type="text" value={formData.rank} readOnly />
                                    </label>

                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>



    );
};

export default Table;
