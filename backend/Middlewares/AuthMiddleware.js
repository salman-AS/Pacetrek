const User = require("../Models/UserModel");
const Student = require('../Models/StudentModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
	const token = req.cookies.token;
	if (!token) {
		return res.json({ status: false });
	}
	jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
		if (err) {
			return res.json({ status: false });
		} else {
			const user = await User.findById(data.id);
			if (user) return res.json({ status: true, user });
			else return res.json({ status: false });
		}
	});
};

module.exports.studentVerification = (req, res) => {
	const token = req.cookies.token;
	if (!token) {
		return res.json({ status: false });
	}
	jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
		if (err) {
			return res.json({ status: false });
		} else {
			const student = await Student.findById(data.id);
			if (student)
				return res.json({ status: true, student });
			else
				return res.json({ status: false });
		}
	});
};

