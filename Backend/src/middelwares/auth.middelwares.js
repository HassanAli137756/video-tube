import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'
import { ApiError } from '../utils/CustomError.js'
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async (req, res, next) =>
{
    
    const accessToken = req.cookies?.accessToken || req.header?.accessToken

    if(!accessToken)
    {
        throw new ApiError(401, "Unauthorized access user not found")
    }


    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)


    const DBUser = await User.findById(decodedToken._id).select('-password -refreshToken')

    if(!DBUser)
    {
        throw new ApiError(401, "Unauthorized access user not found")
    }



    req.user = DBUser

    next()
    



})


export {verifyJWT}