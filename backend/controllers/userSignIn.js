import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials',
                error: true,
                success: false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Invalid credentials',
                error: true,
                success: false
            })
        }

        const tokenData = {
            email: user.email,
            id: user._id
        }
        const token = await jwt.sign(tokenData,  process.env.JWT_SECRET, { expiresIn: '15d' })
        const tokenOptions = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).cookie("token", token, tokenOptions).json({
            message: 'Login successful',
            error: false,
            success: true,
            data: token
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message })
    }
}

export default userSignInController
