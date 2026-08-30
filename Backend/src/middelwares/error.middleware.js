
import {ApiResponse} from '../utils/CustomResponse.js'
import jwt from 'jsonwebtoken'

const errorMiddleware = (err, req, res, next) =>
{
    console.warn("Error middleware executed", err.stack);

    if(err instanceof jwt.TokenExpiredError)
    {
        return res.status(401)
        .json(
            new ApiResponse(401, "jwt have expired", "", false)
        )
    }
    
    res.status(err.statusCode || 500)
    .json(
        new ApiResponse(err.statusCode || 500, err.message || "Internal server error please try again", null, err, false)
    )
}


export {errorMiddleware}