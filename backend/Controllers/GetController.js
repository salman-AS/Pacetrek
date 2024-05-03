const Student = require("../Models/StudentModel");
const Aptitude = require("../Models/AptitudeModel");
const CourseWork = require("../Models/CourseWorkModel");
const Code = require("../Models/CodeModel");
const EventModel = require("../Models/EventModel");

module.exports.getStudents = async (req, res, next) => {
  try {
    const oldstudents = await Student.find()
    const students = oldstudents.map(student => {
      const { _id, firstName, lastName, email, password, admissionNo, year, dept, phoneNo, createdAt, cgpa, score, aptitude, coursework, code, __v } = student
      const dob = student.dob.toLocaleDateString()
      const newStudent = { _id, firstName, lastName, email, password, admissionNo, dob, year, dept, phoneNo, createdAt, cgpa, score, aptitude, coursework, code, __v }
      return newStudent
    })
    res.status(201).json({ message: "Student collection fetched successfully", success: true, students });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAptitudes = async (req, res, next) => {
  try {
    const documents = await Aptitude.find()
    res.status(201).json({ message: "Aptitude collection fetched successfully", success: true, documents });
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.getCourseworks = async (req, res, next) => {
  try {
    const documents = await CourseWork.find()
    res.status(201).json({ message: "Coursework collection fetched successfully", success: true, documents });
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.getCodes = async (req, res, next) => {
  try {
    const codes = await Code.find()
    res.status(201).json({ message: "Code collection fetched successfully", success: true, codes });
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.getEvents = async (req, res, next) => {
  try {
    const oldevents = await EventModel.find()
    const events = oldevents.map(event => {
      const { _id, eventName, eventDetails, eventDate, file, __v } = event
      const eventDateString = eventDate.toString()
      const newEvent = { _id, eventName, eventDetails, eventDate, eventDateString, file, __v }
      return newEvent
    })
    res.status(201).json({ message: "Code collection fetched successfully", success: true, events });
    next();
  } catch (error) {
    console.error(error);
  }
}