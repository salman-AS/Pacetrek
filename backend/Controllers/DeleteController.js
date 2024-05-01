const AptitudeModel = require("../Models/AptitudeModel");
const Code = require("../Models/CodeModel");
const CourseWorkModel = require("../Models/CourseWorkModel");

module.exports.deleteCode = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(401).json({ message: 'No id received' })
        }
        const code = await Code.findByIdAndDelete(id);
        res.status(201).json({ message: "Coding challenge deleted successfully", success: true, code });
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports.deleteCoursework = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(401).json({ message: 'No id received' })
        }
        const coursework = await CourseWorkModel.findByIdAndDelete(id);
        res.status(201).json({ message: "Coursework quiz deleted successfully", success: true, coursework });
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports.deleteAptitude = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(401).json({ message: 'No id received' })
        }
        const aptitude = await AptitudeModel.findByIdAndDelete(id);
        res.status(201).json({ message: "Aptitude quiz deleted successfully", success: true, aptitude });
        next();
    } catch (error) {
        console.error(error);
    }
}