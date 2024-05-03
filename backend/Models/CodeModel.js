const mongoose = require('mongoose')


const codeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required"],
	},
	lcLink: {
		type: String,
		required: [true, "Leetcode link is required"],
	},
	ytLink: {
		type: String,
		required: [true, "Solution link is required"],
	},
	difficulty: {
		type: String,
		required: [true, "Difficulty is required"],
	}
})

module.exports = mongoose.model('Code', codeSchema)