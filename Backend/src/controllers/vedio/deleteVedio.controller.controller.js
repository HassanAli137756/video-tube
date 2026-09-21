
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {removeFromCloudinary} from '../../utils/cloudinary.js'
import {Comment} from '../../models/comment.models.js'
import {Like} from '../../models/like.models.js'
import {User} from '../../models/user.models.js'
import {video} from '../../models/video.models.js'





const deletevideo = asyncHandler( async (req, res) =>
{
    
    const userId = req.user?._id
    const videoId = req.params?.videoId

    console.log("Request reachend in deleting video", videoId);
    

    if(!userId)
    {
        throw new ApiError(401, "Unauthorized access, user does not exist")
    }
    if(!videoId)
    {
        throw new ApiError(400, "video id is not provided")
    }





    const video = await video.findById(videoId)
    if(!video)
    {
        throw new ApiError(404, "video not found")
        
    }
    if(!userId.equals(video.owner))
    {
        throw new ApiError(400, "Unauthorized access, user is not the owner of video")
        
    }






    const deletingCommentsInstance = await Comment.deleteMany({video: video._id})
    const deletingLikesInstance = await Like.deleteMany({video: video._id})


    if(!(deletingCommentsInstance || deletingLikesInstance))
    {
        throw new ApiError(500, "Something went wrong, failed to delete comments & likes of video")

    }

    console.log("Successfully deleted comments and likes");
    

    const removingThumbnailIsntance = await removeFromCloudinary(video.thumbNail_publicId)

    if(!removingThumbnailIsntance)
    {
       throw new ApiError(500, "Failed to remove thumbnail please try again") 
    }

    console.log("Successfully deleted thumbnail from cloudinary");


    const removingvideoIsntance = await removeFromCloudinary(video.video_publicId)

    if(!removingvideoIsntance)
    {
       throw new ApiError(500, "Failed to remove video please try again") 
    }


    console.log("Successfully deleted video from cloudinary");








    const deletingInstance = await video.deleteOne({_id: videoId})


    console.log("Successfully delet video doc from mongoDB");
    

    if(deletingInstance.deletedCount === 0)
    {
        throw new ApiError(500, "Failed to delete video")
    }






    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully deleted video")
    )


})


export {deletevideo}