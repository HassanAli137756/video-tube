

import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Like} from '../../models/like.models.js'









const likevideo = asyncHandler( async (req, res) =>
{
    const videoId = req.params?.videoId
    const userId = req.user?._id


    if(!(videoId || userId))
    {
        throw new ApiError(400, "Please provide all required fields")
    }


    const isAlreadyLiked = await Like.findOne({liker: userId, video: videoId})

    if(isAlreadyLiked)
    {
        throw new ApiError(403, `You have already liked this video ${isAlreadyLiked}`)
    }


    try 
    {
        
        const newLike = await Like.create(
        {
            liker: userId,
            video: videoId
        })
    } 


    catch(error) 
    {

        console.log("There is an error while liking a video", error);
        throw new ApiError(500, "Failed to like video")

    }





    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully liked video")
    )


})


export {likevideo}