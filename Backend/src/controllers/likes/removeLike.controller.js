

import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Like} from '../../models/like.models.js'



const removeLike = asyncHandler( async (req, res) =>
{
    
    const userId = req.user?._id
    const vedioId = req.params?.vedioId



    if(!userId || !vedioId)
    {
        throw new ApiError(400, "Please provide all required fields")
    }


    const DBLike = await Like.findOne({liker: userId, vedio: vedioId})


    if(!DBLike)
    {
        throw new ApiError(404, "Like document not found")
        
    }


    if(!(userId.equals(DBLike.liker)))
    {   
        throw new ApiError(403, "UnAuthorized access requester is not the owner of this like")
    }


    const deletingLikeInstance = await Like.deleteOne({_id: DBLike._id})


    if(!deletingLikeInstance)
    {
        throw new ApiError(500, "Something went wrong, failed to remove like")

    }




    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully romoved like", deletingLikeInstance)
    )



})


export {removeLike}