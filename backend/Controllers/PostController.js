const Aptitude = require("../Models/AptitudeModel");
const CourseWork = require("../Models/CourseWorkModel");
const Code = require("../Models/CodeModel");
const EventModel = require("../Models/EventModel");
const NotificationModel = require("../Models/NotificationModel");

module.exports.postAptitude = async (req, res, next) => {
	try {
		const { title, questions } = req.body;
		if (!title || !questions) {
			return res.status(401).json({ message: 'All fields are required' })
		}
		const notification = {
			type: 'quiz',
			message: `New Aptitude quiz added: ${title}`
		}
		await NotificationModel.create({ ...notification });
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
		const notification = {
			type: 'quiz',
			message: `New Coursework quiz added: ${title}`
		}
		await NotificationModel.create({ ...notification });
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
		const notification = {
			type: 'quiz',
			message: `New coding challenge added: ${title}`
		}
		await NotificationModel.create({ ...notification });
		const code = await Code.create({ title, lcLink, ytLink, difficulty });
		res.status(201).json({ message: "Coding challenge uploaded successfully", success: true, code });
		next();
	} catch (error) {
		console.error(error);
	}
}

module.exports.postEvent = async (req, res, next) => {
	try {
		const { eventName, eventDetails, eventDate, file } = req.body;
		if (!eventName || !eventDetails || !eventDate) {
			return res.status(401).json({ message: 'All fields are required' })
		}
		const notification = {
			type: 'placement',
			message: `New event added: ${eventName}`
		}
		await NotificationModel.create({ ...notification });
		const event = await EventModel.create({ eventName, eventDetails, eventDate, file });
		res.status(201).json({ message: "Event created successfully", success: true, event });
		next();
	} catch (error) {
		console.error(error);
	}
}

module.exports.postNotif = async (req, res, next) => {
	try {
		const { type, message } = req.body;
		if (!message) {
			return res.status(401).json({ message: 'All fields are required' })
		}
		const notification = await NotificationModel.create({ type, message });
		res.status(201).json({ message: "Notification sent successfully", success: true, notification });
		next();
	} catch (error) {
		console.error(error);
	}
}