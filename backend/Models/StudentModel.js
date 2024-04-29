const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    admissionNo: {
        type: Number,
        required: [true, "Admission number is required"],
        maxLength: 5
    },
    dob: {
        type: Date
    },
    sem: {
        type: String
    },
    dept: {
        type: String
    },
    phoneNo: {
        type: Number,
        maxLength: 10
    },
    sex: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

studentSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model('Student', studentSchema)