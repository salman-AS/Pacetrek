const User = require("../Models/UserModel");
const bcrypt = require('bcrypt')
const { createSecretToken } = require("../util/SecretToken");
const Student = require("../Models/StudentModel");

module.exports.Signup = async (req, res, next) => {
	try {
		const { email, password, username, createdAt } = req.body;
		if (!email || !password || !username) {
			return res.json({ message: 'All fields are required' }).status(401)
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ message: "User already exists" }).status(401)
		}
		const user = await User.create({ email, password, username, createdAt });
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		res.status(201).json({ message: "User registered successfully", success: true, user, token });
		next();
	} catch (error) {
		console.error(error);
	}
};

module.exports.Login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: 'All fields are required' }).status(401)
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: 'Account does not exist' }).status(401)
		}
		const auth = await bcrypt.compare(password, user.password)
		if (!auth) {
			return res.json({ message: 'Incorrect password' }).status(401)
		}
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		res.status(200).json({ message: "User logged in successfully", success: true, user, token });
		next()
	} catch (error) {
		console.error(error);
	}
}

module.exports.SignupStudent = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password, admissionNo, dob, year, dept, phoneNo, cgpa } = req.body;
		if (!email || !password || !firstName || !admissionNo) {
			return res.json({ message: 'All fields are required' }).status(401)
		}
		const existingStudent = await Student.findOne({ email });
		if (existingStudent) {
			return res.json({ message: "User already exists" }).status(401)
		}
		const score = cgpa * 10
		const student = await Student.create({ firstName, lastName, email, password, admissionNo, dob, year, dept, phoneNo, cgpa, score });
		// const token = createSecretToken(student._id);
		// res.cookie("token", token, {
		//   withCredentials: true,
		//   httpOnly: false,
		// });
		res.status(201).json({ message: "Student registered successfully", success: true, student });
		next();
	} catch (error) {
		console.error(error);
	}
};

module.exports.LoginStudent = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: 'All fields are required' }).status(401)
		}
		const student = await Student.findOne({ email });
		if (!student) {
			return res.json({ message: 'Account does not exist' }).status(401)
		}
		const auth = await bcrypt.compare(password, student.password)
		if (!auth) {
			return res.json({ message: 'Incorrect password' }).status(401)
		}
		const token = createSecretToken(student._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		})
		// console.log(student.dob.toLocaleDateString())
		res.status(200).json({ message: "Student logged in successfully", success: true, student, token });
		next()
	} catch (error) {
		console.error(error);
	}
}
