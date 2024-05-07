const StudentModel = require("../Models/StudentModel")
const { getScore } = require("../util/Score")
const bcrypt = require('bcrypt')

module.exports.putCoursework = async (req, res, next) => {
	try {
		const { id, mark } = req.body;
		const studentid = req.params.id;
		if (!studentid || !id) {
			return res.status(401).json({ message: 'All fields are required' })
		}
		let student = await StudentModel.findById(studentid)
		let coursework = student.coursework.filter((item) => item.id !== id)
		coursework.push({ id, mark })
		student.coursework = coursework
		const score = getScore(student)
		student.score = score
		student = await StudentModel.findByIdAndUpdate(studentid, { ...student }, { new: true });
		res.status(201).json({ message: "Coursework submitted successfully", success: true, student });
		next();
	} catch (error) {
		console.error(error);
	}
}

module.exports.putCode = async (req, res, next) => {
	try {
		const { id, mark } = req.body;
		const studentid = req.params.id;
		if (!studentid || !id) {
			return res.status(401).json({ message: 'All fields are required' })
		}
		let student = await StudentModel.findById(studentid)
		let code = student.code.filter((item) => item.id !== id)
		if (JSON.stringify(code) !== JSON.stringify(student.code)) {
			student.code = code
			const score = getScore(student)
			student.score = score
			student = await StudentModel.findByIdAndUpdate(studentid, { ...student }, { new: true });
			return res.status(201).json({ message: "Coding challenge unchecked", success: true, student });
		}
		code.push({ id, mark })
		student.code = code
		const score = getScore(student)
		student.score = score
		student = await StudentModel.findByIdAndUpdate(studentid, { ...student }, { new: true });
		res.status(201).json({ message: "Coding challenged checked", success: true, student });
		next();
	} catch (error) {
		console.error(error);
	}
}

module.exports.putAptitude = async (req, res, next) => {
	try {
		const { id, mark } = req.body;
		const studentid = req.params.id;
		if (!studentid || !id) {
			return res.status(401).json({ message: 'All fields are required' })
		}
		let student = await StudentModel.findById(studentid)
		let aptitude = student.aptitude.filter((item) => item.id !== id)
		aptitude.push({ id, mark })
		student.aptitude = aptitude
		// console.log(student)
		const score = getScore(student)
		student.score = score
		student = await StudentModel.findByIdAndUpdate(studentid, { ...student }, { new: true });
		res.status(201).json({ message: "Aptitude submitted successfully", success: true, student });
		next();
	} catch (error) {
		console.error(error);
	}
}

module.exports.updateStudent = async (req, res, next) => {
	try {
		const { updatedStudent } = req.body;
		const id = req.params.id;
		if (updatedStudent.password) {
			// console.log(updatedStudent)
			updatedStudent.password = await bcrypt.hash(updatedStudent.password, 12)
		} else {
			const student = await StudentModel.findById(id)
			updatedStudent.password = student.password
		}
		// console.log(updatedStudent)
		const student = await StudentModel.findByIdAndUpdate(id, { ...updatedStudent }, { new: true });
		res.status(201).json({ message: "Profile updated successfully", success: true, student });
		next();
	} catch (error) {
		console.error(error);
	}
}