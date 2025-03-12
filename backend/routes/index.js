import express from 'express';

const router = express.Router();

import registerUser from '../controllers/userSignUp.js';
router.post('/sign-up', registerUser);

import loginUser from '../controllers/userSignIn.js';
router.post('/sign-in', loginUser);

export default router;
