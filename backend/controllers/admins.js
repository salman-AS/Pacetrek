const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminsRouter = require('express').Router()
const Admin = require('../models/admin')
const { request } = require('../app')

adminsRouter.post('/signup', async (request, response, next) => {
    try {
        const admin = await Admin.findOne({ email: request.body.email})
        if(admin){
            return response.status(400).json({
                status: 'Fail',
                message: 'Admin already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10)

        const newAdmin = await Admin.create({
            ...request.body,
            passwordHash: hashedPassword,
        })

        const adminForToken = {
            id: newAdmin._id,
        }
    
        const token = jwt.sign(
            adminForToken,
            process.env.SECRET,
            { expiresIn: 60 * 60 }
        )

        response
		.status(201)
		.json({ token, status: 'success', message: 'Admin registered successfully', newAdmin })
    }catch(error){
        next(error)
    }
})

adminsRouter.post('/login', async (request, response, next) => {
    try {
        const {email, password} = request.body;
        const admin = await Admin.findOne({email})
        if(!admin){
            return response.status(404).json({
                status: 'Fail',
                message: 'Admin not found'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash)
        if(!isPasswordValid){
            return response.status(401).json({
                status: 'Fail',
                message: 'Invalid email or password'
            })
        }

        const adminForToken = {
            id: Admin._id,
        }
        const token = jwt.sign(
            adminForToken,
            process.env.SECRET,
            { expiresIn: 60 * 60 }
        )

        response.status(201).json({
            status: 'Success',
            token,
            message: 'Logged in successfully',
            admin
        })
    } catch (error) {
        next(error)
    }
})

module.exports = adminsRouter