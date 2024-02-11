import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import errorMiddleware from './middlewares/errors.middleware.js';

dotenv.config();

//connection to db
mongoose
// @ts-ignore
.connect(process.env.MONGO) //not taking string | undefined error?
.then(() => {
    console.log('MongoDB is connected');
})
.catch((err) => {
    console.log(err);
})


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text())


//routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use(errorMiddleware);              //error handling middleware


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})
