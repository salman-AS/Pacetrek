const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String
    },
    options: [String]
})

const courseworkSchema = new mongoose.Schema({
    title: {
     type: String,
     required: [true,"Title is required"],
    },
    questions: [questionSchema],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Coursework',courseworkSchema)