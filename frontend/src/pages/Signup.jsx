import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie"
import '../styles/ls.css'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
	const navigate = useNavigate()
	const [cookies, removeCookie] = useCookies([]);

	const verifyCookie = async () => {
		if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
			console.log(cookies)
			// navigate("/admin/signup")
			removeCookie("token")
			return;
		}
		const { data } = await axios.post(
			"http://localhost:4000/api/admin",
			{},
			{ withCredentials: true }
		);
		const { status } = data;
		console.log(data)
		return status
			? navigate('/dashboard')
			: (removeCookie("token"), navigate("/admin/login"));
	};

	useEffect(() => {
		console.log(cookies)
		verifyCookie();
	}, [cookies, navigate, removeCookie]);

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		username: "",
	})

	const { email, password, username } = inputValue

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	}

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
		try {

			if (!email || !password || !username) {
				handleError('Please fill all the fields!!')
				return;
			}

			const { data } = await axios.post(
				"http://localhost:4000/api/admin/signup",
				{
					...inputValue,
				},
				{ withCredentials: true }
			);
			const { success, message } = data;
			if (success) {
				handleSuccess(message);
				setTimeout(() => {
					navigate("/dashboard");
				}, 1000);
			} else {
				handleError(message);
			}
		} catch (error) {
			console.log(error);
		}
		setInputValue({
			...inputValue,
			email: "",
			password: "",
			username: "",
		});
	};

	return (
		<div className="auth-body">
			<div className="form_container">
				<h2>Signup Account</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Enter your email"
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<label htmlFor="email">Username</label>
						<input
							type="text"
							name="username"
							value={username}
							placeholder="Enter your username"
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Enter your password"
							onChange={handleOnChange}
						/>
					</div>
					<button type="submit">Submit</button>
					<span>
						Already have an account? <Link to={"/admin/login"}>Login</Link>
					</span>
				</form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default Signup;