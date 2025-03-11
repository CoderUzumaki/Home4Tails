import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/index.js';
import { json } from 'express';

dotenv.config()

const app = express()
app.use(cors())
app.use(json())
app.use('/api', router)

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('MONGO DB CONNECTED')
        console.log(`Server running on port: ${PORT}`)
    });
})
