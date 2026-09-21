
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Comment} from '../../models/comment.models.js'




const addComment = asyncHandler( async (req, res) =>
{
    const comment = req.body?.comment
    const vedioId = req.params?.vedioId
    const userId = req.user?._id

    if(!(vedioId  || comment || userId))
    {
        throw new ApiError(400, "Please provide all required fields")
    }

    const addedComment = await Comment.create(
    {
        vedio: vedioId,
        commenter: userId,
        content: comment,
    }
    )


    if(!addedComment)
    {
        throw new ApiError(500, "Failed to add comment")
    }



    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully added comment", addedComment)
    )


})


export {addComment}