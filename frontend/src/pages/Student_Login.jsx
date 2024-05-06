import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { useCookies } from "react-cookie"
import '../styles/ls.css'
import 'react-toastify/dist/ReactToastify.css'

const Student_Login = () => {
	const navigate = useNavigate();
	const [cookies, removeCookie] = useCookies([]);

	const verifyCookie = async () => {
		if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
			console.log(cookies)
			// navigate("/admin/login");
			removeCookie("token")
			return;
		}
		const { data } = await axios.post(
			"http://localhost:4000/api/student",
			{},
			{ withCredentials: true }
		);
		const { status } = data;
		console.log(data)
		return status
			? navigate('/student/dashboard')
			: (removeCookie("token")/* , navigate("/Student/login") */);
	};

	useEffect(() => {
		console.log(cookies)
		verifyCookie();
	}, [cookies, navigate, removeCookie]);

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
	});

	const { email, password } = inputValue;


	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	const handleError = (err) =>
		toast.error(err, {
			position: "bottom-left",
		});
	const handleSuccess = (msg) =>
		toast.success(msg, {
			position: "bottom-left",
		});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"http://localhost:4000/api/student/login",
				{
					...inputValue,
				},
				{ withCredentials: true }
			);
			console.log(data);
			const { success, message } = data;
			if (success) {
				handleSuccess(message);
				setTimeout(() => {
					console.log(cookies)
					navigate("/student/dashboard");
				}, 1000);
			} else {
				handleError(message);
			}
		} catch (error) {
			console.log(error)
			handleError('Sorry! Some error occured. Please try again')
		}
		setInputValue({
			...inputValue,
			email: "",
			password: "",
		});
	};

	return (
		<div className="auth-body">
			<div className="form_container">
				<h2>Login Account</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email</label>
						<input
							required
							type="email"
							name="email"
							value={email}
							placeholder="Enter your email"
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							required
							type="password"
							name="password"
							value={password}
							placeholder="Enter your password"
							onChange={handleOnChange}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default Student_Login;
