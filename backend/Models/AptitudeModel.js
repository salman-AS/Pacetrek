const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
	question: {
		type: String
	},
	options: [String],
	correctAnswer: {
		type: String
	}
})

const aptitudeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required"],
	},
	questions: [questionSchema],
	createdAt: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model('Aptitude', aptitudeSchema)