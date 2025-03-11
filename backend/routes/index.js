import express from 'express';

const router = express.Router();

import registerUser from '../controllers/userSignUp.js';
router.post('/sign-up', registerUser);

export default router;
