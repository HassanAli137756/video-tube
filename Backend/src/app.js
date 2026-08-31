
import dotenv from 'dotenv'
dotenv.config()


import express, { json } from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { userRouter } from './routes/user.routes.js';
import { vedioRouter } from './routes/vedio.routes.js';
import { commentRouter } from './routes/comments.routes.js';
import { likeRouter } from './routes/like.routes.js';
import { subscriptionRouter } from './routes/subscription.routes.js';
import {errorMiddleware} from './middelwares/error.middleware.js'

export const app = express()

app.use(cors({
    origin: "https://video-tube-346yc1mzh-hassanali240489-4130s-projects.vercel.app",
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



// app.js me baaki routes se upar add karen
app.get('/', (req, res) => {
    res.json({ message: "VideoTube Backend is Live and Running Successfully!" });
});



app.use('/api/v1/users', userRouter)

app.use('/api/v1/vedios', vedioRouter)

app.use('/api/v1/comments', commentRouter)

app.use('/api/v1/likes', likeRouter)

app.use('/api/v1/subscriptions', subscriptionRouter)




app.use(errorMiddleware)