import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import createConnection from './database/connection.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import workoutRouter from './routes/workout.router..js';

// await createConnection();
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use('/workout', workoutRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`server started at port ${PORT}`));