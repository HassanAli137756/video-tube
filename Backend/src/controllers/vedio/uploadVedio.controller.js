
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {uploadImageOnCloundinary, uploadVedioOnCloundinary} from '../../utils/cloudinary.js'
import {Vedio} from '../../models/vedio.models.js'



const uploadVedio = asyncHandler( async (req, res) =>
{
    const userid = req.user?._id
    const { title, description, isPublished=true} = req.body
    const thumbNail = req.files?.thumbNail[0]?.path
    const vedio = req.files?.vedio[0]?.path


    if(!userid)
    {
        throw new ApiError(401, "Unauthorized access, user does not exist")
    }


    if(!title?.trim() || !description?.trim() || !thumbNail || !vedio)
    {
        throw new ApiError(400, "All fields are required")
    }


    const uploadedThumbnail = await uploadImageOnCloundinary(thumbNail)

    if(!uploadedThumbnail)
    {
        throw new ApiError(500, "Failed to upload thumb-nail on cloudinary")
    }

    
    const uploadedVedio = await uploadVedioOnCloundinary(vedio)


    if(!uploadedVedio)
    {
        await removeFromCloudinary(uploadedThumbnail.public_id)
        throw new ApiError(500, "Failed to upload vedio on cloudinary")
    }


    const DBVedio = await Vedio.create(
    {
        description,
        thumbNail: uploadedThumbnail.url,
        thumbNail_publicId: uploadedThumbnail.public_id,
        title,
        vedio: uploadedVedio.url,
        vedio_publicId: uploadedVedio.public_id,
        duration: uploadedVedio.duration,
        owner: userid,
        isPublished
    }
    )


    if(!DBVedio)
    {
        await removeFromCloudinary(uploadedThumbnail.public_id)
        await removeFromCloudinary(uploadedVedio.public_id)
        throw new ApiError(500, "Something went wrong, failed to upload vedio")
    }


    return res
    .status(201)
    .json(
        new ApiResponse(201, "Successfully uploaded vedio", DBVedio)
    )
    

})

export {uploadVedio}
