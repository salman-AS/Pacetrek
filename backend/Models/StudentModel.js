const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastName: {
        type: String
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
        type: Date //'yyyy-mm-dd'
    },
    year: {
        type: Number
    },
    dept: {
        type: String
    },
    phoneNo: {
        type: Number,
        maxLength: 10
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

studentSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    // this.dob = await this.dob.toLocaleDateString()
    next()
})

module.exports = mongoose.model('Student', studentSchema)