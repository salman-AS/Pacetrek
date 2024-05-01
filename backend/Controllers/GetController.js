const Student = require("../Models/StudentModel");
const Aptitude = require("../Models/AptitudeModel");
const CourseWork = require("../Models/CourseWorkModel");
const Code = require("../Models/CodeModel");

module.exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find()
    res.status(201).json({ message: "Student collection fetched successfully", success: true, students });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAptitudes = async (req,res,next) => {
  try {
    const documents = await Aptitude.find()
    res.status(201).json({ message: "Aptitude collection fetched successfully", success: true, documents });
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.getCourseworks = async (req,res,next) => {
  try {
    const documents = await CourseWork.find()
    res.status(201).json({ message: "Coursework collection fetched successfully", success: true, documents });
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.getCodes = async(req,res,next) => {
  try {
    const codes = await Code.find()
    res.status(201).json({ message: "Code collection fetched successfully", success: true, codes });
    next();
  } catch (error) {
    console.error(error);
  }
}