import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {ApiError} from '../../utils/CustomError.js'
import {User} from '../../models/user.models.js'
import mongoose from 'mongoose'


const removevideoFromHistory = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id
    const videoId = req.params?.videoId

    if(!userId  || !videoId)
    {
        throw new ApiError(401, "Please provide all required credentials ")
    }


    const DBUser = await User.findOne({_id: userId})


    if(!DBUser?._id)
    {
        throw new ApiError(505, "Failed to fetched user from database")
    }


    if(DBUser.watchHistory.includes(videoId))
    {
        DBUser.watchHistory = DBUser.watchHistory.filter(item => !item.equals(videoId))

        

        await DBUser.save({validateBeforeSave: false})

        return res
        .status(200)
        .json(
            new ApiResponse(200, `Successfully removed video from watch History: watchHistory: ${DBUser.watchHistory}`)
        )

    }
    else
    {
        return res
        .status(200)
        .json(
            new ApiError(404, "video is not existed, may be already deleted")
        )
    }









})


export {removevideoFromHistory}