const Aptitude = require("../Models/AptitudeModel");
const CourseWork = require("../Models/CourseWorkModel");
const Code = require("../Models/CodeModel")

module.exports.postAptitude = async (req, res, next) => {
    try {
        const { title, questions } = req.body;
        if (!title || !questions) {
            return res.status(401).json({ message: 'All fields are required' })
        }
        const aptitude = await Aptitude.create({ title, questions });
        res.status(201).json({ message: "Aptitude quiz uploaded successfully", success: true, aptitude });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.postCoursework = async (req, res, next) => {
    try {
        const { title, questions } = req.body;
        if (!title || !questions) {
            return res.status(401).json({ message: 'All fields are required' })
        }
        const coursework = await CourseWork.create({ title, questions });
        res.status(201).json({ message: "Coursework quiz uploaded successfully", success: true, coursework });
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports.postCode = async (req, res, next) => {
    try {
        const { title, lcLink, ytLink, difficulty } = req.body;
        if (!title) {
            return res.status(401).json({ message: 'All fields are required' })
        }
        const code = await Code.create({ title, lcLink, ytLink, difficulty });
        res.status(201).json({ message: "Coding challenge uploaded successfully", success: true, code });
        next();
    } catch (error) {
        console.error(error);
    }
}