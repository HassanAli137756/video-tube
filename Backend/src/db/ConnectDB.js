import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
import {ApiError} from '../utils/CustomError.js'

// this is like a api call which will request for connection by using async await structure
export const ConnectDB = async () =>
{
    try 
    {
        
        // mongoose will connect database based on two things: 
        // 1.database URL coming from .env: essential
        // 2.database name : will connect database named DB_NAME if exist, in other case it will created Database named DB_NAME
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)

        console.log('Successfully connected with DB at host:', connectionInstance.connection.host);

        return connectionInstance
        
       


    } 
    catch(error) 
    {
        console.log('Error while connecting DB :', error);
        throw new ApiError(500, 'Failed to connect MonogDB')
    }
}

