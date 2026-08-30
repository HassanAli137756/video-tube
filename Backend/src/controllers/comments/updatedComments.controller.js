
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Comment} from '../../models/comment.models.js'



const updateComment = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id
    const commentId = req.params?.commentId
    const newComment = req.body?.newComment


    
    if(!newComment?.trim() || newComment == undefined )
    {
        throw new ApiError(400, "Please provide updated comment")
    }


    if(!(userId || commentId))
    {
        throw new ApiError(400, "All feilds are required")
    }

    const DBComment = await Comment.findById(commentId)


    if(!DBComment)
    {
        throw new ApiError(404, "Comment not found, possibily comment has deleted")
    }


    if(!(DBComment.commenter.equals(userId)))
    {
        throw new ApiError(403, "Unauthorized access requester is not the owner of this comment")
        
    }

    DBComment.content = newComment

    try {
        
        await DBComment.save({validateBeforeSave: false})
    
    } 
    catch(error) 
    {
        throw new ApiError(500, "Failed to updated comment", null , error.message)
        
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully updated comment", DBComment)
    )



})


export {updateComment}