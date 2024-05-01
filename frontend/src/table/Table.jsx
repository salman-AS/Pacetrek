import React, { useState } from "react";
import '../styles/Table.css';

const Table = () => {
    // Sample student data (replace with your actual data)
    const students = [
        { id: 1, name: "Salman ", email: "Salman@gmail.com", phone: "1234567890", year: "Senior", cgpa: "3.8", rank: 1, department: "Computer Science" },
        { id: 2, name: "Shahna Sheri", email: "Shana@gmail.com", phone: "9876543210", year: "Junior", cgpa: "3.6", rank: 2, department: "Electrical Engineering" },
        { id: 3, name: "sahal", email: "sahal@gmail.com", phone: "5678901234", year: "Sophomore", cgpa: "3.5", rank: 3, department: "Mechanical Engineering" },
        { id: 4, name: "Rida" , email:"Rida@gmail.com", phone: "4567890123", year: "Freshman", cgpa: "3.9", rank: 4, department: "Chemical Engineering" },
        
    ];

    // State to manage modal visibility and form fields
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        year: "",
        cgpa: "",
        rank: "",
        department: ""
    });

    const handleViewClick = (student) => {
        // Set form data and show the modal
        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone,
            year: student.year,
            department: student.department,
            cgpa: student.cgpa,
            rank: student.rank.toString(),
            
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        // Close the modal
        setShowModal(false);
    };

    return (
        <div className="table-container">
            <h1 className="table-heading">Student Evaluation Page</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header">Student ID</th>
                        <th className="table-header">Name</th>
                        <th className="table-header">Email</th>
                        <th className="table-header">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td className="table-cell">{student.id}</td>
                            <td className="table-cell">{student.name}</td>
                            <td className="table-cell">{student.email}</td>
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
                            Email:
                            <input type="email" value={formData.email} readOnly />
                        </label>
                        <label className="modal-label">
                            Phone Number:
                            <input type="tel" value={formData.phone} readOnly />
                        </label>
                        <label className="modal-label">
                            Year:
                            <input type="text" value={formData.year} readOnly />
                        </label> 
                        <label className="modal-label">
                            Department:
                            <input type="text" value={formData.department} readOnly />
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
    );
};

export default Table;
