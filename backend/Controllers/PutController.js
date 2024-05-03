const StudentModel = require("../Models/StudentModel")
const { getScore } = require("../util/Score")

module.exports.putCoursework = async (req, res, next) => {
    try {
        const { studentid, id, mark } = req.body;
        if (!studentid || !id || !mark) {
            return res.status(401).json({ message: 'All fields are required' })
        }
        const student = await StudentModel.findById(studentid)
        const coursework = student.coursework.filter((item) => item.id !== id)
        student = { ...student, coursework: coursework.push({ id, mark }) }
        const score = getScore(student)
        student = await StudentModel.findByIdAndUpdate(studentid, { score, coursework: coursework.push({ id, mark }) }, { new: true });
        res.status(201).json({ message: "Coursework submitted successfully", success: true, student });
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports.putCode = async (req, res, next) => {
    try {
        const { studentid, id, mark } = req.body;
        if (!studentid || !id || !mark) {
            return res.status(401).json({ message: 'All fields are required' })
        }
        const student = await StudentModel.findById(studentid)
        const code = student.code.filter((item) => item.id !== id)
        student = { ...student, code: code.push({ id, mark }) }
        const score = getScore(student)
        student = await StudentModel.findByIdAndUpdate(studentid, { score, code: code.push({ id, mark }) }, { new: true });
        res.status(201).json({ message: "Code submitted successfully", success: true, student });
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports.putAptitude = async (req, res, next) => {
    try {
        const { studentid, id, mark } = req.body;
        if (!studentid || !id || !mark) {
            return res.status(401).json({ message: 'All fields are required' })
        }
        const student = await StudentModel.findById(studentid)
        const aptitude = student.aptitude.filter((item) => item.id !== id)
        student = { ...student, aptitude: aptitude.push({ id, mark }) }
        const score = getScore(student)
        student = await StudentModel.findByIdAndUpdate(studentid, { score, aptitude: aptitude.push({ id, mark }) }, { new: true });
        res.status(201).json({ message: "Aptitude submitted successfully", success: true, student });
        next();
    } catch (error) {
        console.error(error);
    }
}