

import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Like} from '../../models/like.models.js'









const likeVedio = asyncHandler( async (req, res) =>
{
    const vedioId = req.params?.vedioId
    const userId = req.user?._id


    if(!(vedioId || userId))
    {
        throw new ApiError(400, "Please provide all required fields")
    }


    const isAlreadyLiked = await Like.findOne({liker: userId, vedio: vedioId})

    if(isAlreadyLiked)
    {
        throw new ApiError(403, `You have already liked this vedio ${isAlreadyLiked}`)
    }


    try 
    {
        
        const newLike = await Like.create(
        {
            liker: userId,
            vedio: vedioId
        })
    } 


    catch(error) 
    {

        console.log("There is an error while liking a vedio", error);
        throw new ApiError(500, "Failed to like vedio")

    }





    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully liked vedio")
    )


})


export {likeVedio}