/* import 'dotenv/config.js'

import {ConnectDB} from './db/ConnectDB.js'
import express from 'express'
import { ApiError } from './utils/CustomError.js'
import {app} from './app.js'
import { errorMiddleware } from './middelwares/error.middleware.js'





ConnectDB()
.then(() => 
    app.listen(process.env.PORT, () =>
    {
        console.log('Server is successfull activated at port:', process.env.PORT);
        
        
    })
)
.catch((error) => 
    {
        console.log("Failed to activating server")
        throw new ApiError(500, 'Failed to connect MongoDB', '', error)
    })

 */

import 'dotenv/config.js'


import { ConnectDB } from './db/ConnectDB.js'
import { app } from './app.js'
import { ApiError } from './utils/CustomError.js'

// Ek variable banayein jo check karega db connected hai ya nahi
let isConnected = false;

const startServer = async () => {
    if (isConnected) {
        return app;
    }
    try {
        await ConnectDB();
        isConnected = true;
        console.log("MongoDB Connected Successfully");
        return app;
    } catch (error) {
        console.log("Failed to connect MongoDB");
        throw new ApiError(500, 'Failed to connect MongoDB', '', error);
    }
}

// Har incoming request se pehle DB connection check hoga
app.use(async (req, res, next) => {
    await startServer();
    next();
});

// Local testing ke liye (Vercel isko ignore karega, lekin local pe kaam karega)
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running locally on port:', process.env.PORT || 3000);
    });
}

export default app; // Vercel ke liye sab se zaroori line
