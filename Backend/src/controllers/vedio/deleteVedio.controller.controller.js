
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {removeFromCloudinary} from '../../utils/cloudinary.js'
import {Comment} from '../../models/comment.models.js'
import {Like} from '../../models/like.models.js'
import {User} from '../../models/user.models.js'
import {Vedio} from '../../models/vedio.models.js'





const deleteVedio = asyncHandler( async (req, res) =>
{
    
    const userId = req.user?._id
    const vedioId = req.params?.vedioId

    console.log("Request reachend in deleting vedio", vedioId);
    

    if(!userId)
    {
        throw new ApiError(401, "Unauthorized access, user does not exist")
    }
    if(!vedioId)
    {
        throw new ApiError(400, "Vedio id is not provided")
    }





    const vedio = await Vedio.findById(vedioId)
    if(!vedio)
    {
        throw new ApiError(404, "Vedio not found")
        
    }
    if(!userId.equals(vedio.owner))
    {
        throw new ApiError(400, "Unauthorized access, user is not the owner of vedio")
        
    }






    const deletingCommentsInstance = await Comment.deleteMany({vedio: vedio._id})
    const deletingLikesInstance = await Like.deleteMany({vedio: vedio._id})


    if(!(deletingCommentsInstance || deletingLikesInstance))
    {
        throw new ApiError(500, "Something went wrong, failed to delete comments & likes of vedio")

    }

    console.log("Successfully deleted comments and likes");
    

    const removingThumbnailIsntance = await removeFromCloudinary(vedio.thumbNail_publicId)

    if(!removingThumbnailIsntance)
    {
       throw new ApiError(500, "Failed to remove thumbnail please try again") 
    }

    console.log("Successfully deleted thumbnail from cloudinary");


    const removingVedioIsntance = await removeFromCloudinary(vedio.vedio_publicId)

    if(!removingVedioIsntance)
    {
       throw new ApiError(500, "Failed to remove vedio please try again") 
    }


    console.log("Successfully deleted vedio from cloudinary");








    const deletingInstance = await Vedio.deleteOne({_id: vedioId})


    console.log("Successfully delet vedio doc from mongoDB");
    

    if(deletingInstance.deletedCount === 0)
    {
        throw new ApiError(500, "Failed to delete vedio")
    }






    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully deleted vedio")
    )


})


export {deleteVedio}