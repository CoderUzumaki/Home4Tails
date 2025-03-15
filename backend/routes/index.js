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

/* Admin Panel Routes */

/* Admin User Controller - Get all user details for admin panel */
import AdminUserController from '../controllers/admin/AdminUserController.js'
router.get('/admin/users', authToken, AdminUserController) // Uses authToken middleware to verify the user


export default router;
