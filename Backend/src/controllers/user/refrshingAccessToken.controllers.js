import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'
import jwt from 'jsonwebtoken'
import { generateAccessAndRefreshTokens } from './userLogin.controllers.js'


const refreshingAccessToken = asyncHandler(async (req, res) =>
{
    
    const incommingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!incommingRefreshToken) 
    {

        throw new ApiError(401, "Un-authorized request incommingRefreshToken is not provided")
        
    }

    
    const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)



    const DBUser = await User.findById(decodedToken._id)

    if(!DBUser)
    {
        throw new ApiError(401, "Un-authorized request, user not exist")

    }


    if (DBUser.refreshToken !== incommingRefreshToken) 
    {
        throw new ApiError(401, `User is unauthorized, login session has ended you should login first `, )
    }

    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(DBUser._id)


    const cookieSecurityOptions = 
    {
        httpOnly: true,
        secure: true
    }


    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieSecurityOptions)
    .cookie("refreshToken", refreshToken, cookieSecurityOptions)
    .json(
        new ApiResponse(200, "Successfully Genrated access and refresh tokens", {accessToken, refreshToken})
    )


})


export {refreshingAccessToken}