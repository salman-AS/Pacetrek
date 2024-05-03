const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
	eventName: {
		type: String,
		required: [true, "Event name is required"],
	},
	eventDetails: {
		type: String,
		required: [true, "Event details are required"],
	},
	eventDate: {
		type: Date,
		required: [true, "Event date is required"],
	},
	file: {
		type: String
	}
})

module.exports = mongoose.model('Event', eventSchema)