import React, { useState, useEffect } from 'react';
//import '../styles/HelpPage.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const HelpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form validation
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Form submission logic here (e.g., sending email, API call)
            console.log('Form submitted:', formData);
            setSubmitted(true);
            // Reset form fields after submission
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email address';
        }

        if (!data.message.trim()) {
            errors.message = 'Message is required';
        }

        return errors;
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="help-page">
            <div className="help-content">
                <h2>Contact Technical Support</h2>
                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} />
                            {errors.message && <span className="error">{errors.message}</span>}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                ) : (
                    <div className="thank-you-message">
                        <p>Thank you for your inquiry!</p>
                        <p>We'll get back to you as soon as possible.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HelpPage;
