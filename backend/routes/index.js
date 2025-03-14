import express from 'express'
const router = express.Router()

/* Register a new user */
import registerUser from '../controllers/userSignUp.js'
router.post('/sign-up', registerUser)

/* Login a user */
import loginUser from '../controllers/userSignIn.js'
router.post('/sign-in', loginUser)

/* Get user details */
import authToken from '../middlewares/authToken.js'
import userDetailsController from '../controllers/userDetails.js'
router.get('/user-details', authToken, userDetailsController)

/* Logout a user */
import logoutUser from '../controllers/userLogout.js'
router.get('/logout', authToken, logoutUser)


export default router;
