import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {ApiError} from '../../utils/CustomError.js'
import {User} from '../../models/user.models.js'


const addvideoInHistory = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id
    const videoId = req.params?.videoId

    if(!userId  || !videoId)
    {
        throw new ApiError(401, "Please provide all required credentials ")
    }


    const DBUser = await User.findOne({_id: userId})


    if(!DBUser)
    {
        throw new ApiError(505, "Failed to fetched user from database")
    }

    

    if(DBUser.watchHistory.includes(videoId))
    {
        return res
        .status(200)
        .json(
            new ApiResponse(200, "video already exist in history")
        )
        

    }

    else
    {

        DBUser.watchHistory.push(videoId)

        await DBUser.save({validateBeforeSave: false})

        return res
        .status(200)
        .json(
            new ApiResponse(200, "Successfully added video to watch History")
        )
        
    }








})


export {addvideoInHistory}