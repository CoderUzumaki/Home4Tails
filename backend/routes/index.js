import express from 'express'
const router = express.Router()

import registerUser from '../controllers/userSignUp.js'
router.post('/sign-up', registerUser)

import loginUser from '../controllers/userSignIn.js'
router.post('/sign-in', loginUser)

import authToken from '../middlewares/authToken.js'
import userDetailsController from '../controllers/userDetails.js'
router.get('/user-details', authToken, userDetailsController)

export default router;
