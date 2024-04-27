const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
    email: {
        type: String,
		required: true,
		unique: true
    },
	// role: {
    //     type: String,
    //     default: 'user'
    // },
	passwordHash: String,
})

adminSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash
	}
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin