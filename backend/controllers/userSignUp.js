import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'

const userSignUpController = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await userModel.findOne({ email })
        if(existingUser) {
            return res.status(400).json({
                message: 'User already exists',
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        if(!hashedPassword) {
            throw new Error('Password hashing failed')
        }

        const userData = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await userData.save()
        if(!savedUser) {
            throw new Error('User data saving failed')
        }

        return res.status(201).json({
            message: 'User created successfully',
            error: false,
            success: true,
            userId: savedUser._id
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export default userSignUpController
