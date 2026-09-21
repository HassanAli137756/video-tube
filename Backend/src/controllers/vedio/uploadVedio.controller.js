
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {uploadImageOnCloundinary, uploadvideoOnCloundinary} from '../../utils/cloudinary.js'
import {video} from '../../models/video.models.js'



const uploadvideo = asyncHandler( async (req, res) =>
{
    const userid = req.user?._id
    const { title, description, isPublished=true} = req.body
    const thumbNail = req.files?.thumbNail[0]?.buffer
    const video = req.files?.video[0]?.buffer


    if(!userid)
    {
        throw new ApiError(401, "Unauthorized access, user does not exist")
    }


    if(!title?.trim() || !description?.trim() || !thumbNail || !video)
    {
        throw new ApiError(400, "All fields are required")
    }


    const uploadedThumbnail = await uploadImageOnCloundinary(thumbNail)

    if(!uploadedThumbnail)
    {
        throw new ApiError(500, "Failed to upload thumb-nail on cloudinary")
    }

    
    const uploadedvideo = await uploadvideoOnCloundinary(video)


    if(!uploadedvideo)
    {
        await removeFromCloudinary(uploadedThumbnail.public_id)
        throw new ApiError(500, "Failed to upload video on cloudinary")
    }


    const DBvideo = await video.create(
    {
        description,
        thumbNail: uploadedThumbnail.secure_url,
        thumbNail_publicId: uploadedThumbnail.public_id,
        title,
        video: uploadedvideo.secure_url,
        video_publicId: uploadedvideo.public_id,
        duration: uploadedvideo.duration,
        owner: userid,
        isPublished
    }
    )


    if(!DBvideo)
    {
        await removeFromCloudinary(uploadedThumbnail.public_id)
        await removeFromCloudinary(uploadedvideo.public_id)
        throw new ApiError(500, "Something went wrong, failed to upload video")
    }


    return res
    .status(201)
    .json(
        new ApiResponse(201, "Successfully uploaded video", DBvideo)
    )
    

})

export {uploadvideo}
