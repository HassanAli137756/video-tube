import 'dotenv/config.js'

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

