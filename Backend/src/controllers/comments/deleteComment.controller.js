
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Comment} from '../../models/comment.models.js'




const deleteComment = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id
    const commentId = req.params?.commentId


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

    try 
    {
        
        await DBComment.deleteOne({_id: DBComment._id})


    } 
    catch(error) 
    {
        throw new ApiError(500, "Failed to delete comment", null, error.message)
    }


    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully deleted comment")
    )


})


export {deleteComment}