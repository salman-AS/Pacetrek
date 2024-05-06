const mongoose = require('mongoose')


const notifSchema = new mongoose.Schema({
	type: String,
    message: String
})

module.exports = mongoose.model('Notification', notifSchema)