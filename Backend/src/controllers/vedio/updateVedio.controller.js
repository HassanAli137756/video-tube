
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {video} from '../../models/video.models.js'
import { uploadImageOnCloundinary , removeFromCloudinary } from '../../utils/cloudinary.js'



const updatevideo = asyncHandler( async (req, res) =>
{
    
    if(!req.body)
        {
            throw new ApiError(401, "body is not provided or it is undefined")
            
        }
        
        
    const userId = req.user?._id
    const {title, description, isPublished} = req?.body
    const thumbNail = req.file?.buffer
    const videoId = req.params?.videoId


    console.log("ThumbNail in video controller", thumbNail);
    
    

    if(!userId)
    {
        throw new ApiError(401, "Unauthorized access, user does not exist")
    }

    if(!videoId)
    {
        throw new ApiError(400, "video id is not provided")
    }


    if(!title?.trim() && !description?.trim() && !thumbNail && !(typeof isPublished == "boolean"))
    {
       throw new ApiError(400, "Please provide atleast one field to update") 
    }


    const DBvideo = await video.findById(videoId)

    if(!DBvideo)
    {
       throw new ApiError(404, "video not exist") 
    }


    if(!DBvideo.owner.equals(userId))
    {
       throw new ApiError(401, "unauthorized action, user is not owner of video") 

    }



    let isThumbNailProvided = !!thumbNail
    let newUploadedThumbnail = null
    let oldThumbnailId = ""
    let isExistingThumbNailRemoved = true

    if(isThumbNailProvided)
    {
        newUploadedThumbnail = await uploadImageOnCloundinary(thumbNail)

        if(!newUploadedThumbnail)
        {
            throw new ApiError(500, "Failed to upload updated thumbnail")
            
        }

        oldThumbnailId = DBvideo.thumbNail_publicId
    }

    if(title?.trim())
    {
        DBvideo.title = title
    }

    if(description?.trim())
    {
        DBvideo.description = description
    }

    DBvideo.isPublished = isPublished

    if(isThumbNailProvided && newUploadedThumbnail.secure_url && oldThumbnailId.length > 0)
    {
        DBvideo.thumbNail = newUploadedThumbnail.secure_url
        DBvideo.thumbNail_publicId = newUploadedThumbnail.public_id
    }


    await DBvideo.save({validateBeforeSave: false})

    if(isThumbNailProvided && oldThumbnailId)
    {
        const removingThumbnailIsntance = await removeFromCloudinary(oldThumbnailId)

        if(!removingThumbnailIsntance)
        {
            console.log("Failed to remove existing or old thumbnail from cloudinary");

            isExistingThumbNailRemoved = false
        }


    }


    return res
    .status(200)
    .json(
        new ApiResponse(200, `Successfully updated fields ${!isExistingThumbNailRemoved ? ', but failed to remove existing thumbNail from cloudinary' : ''}`)
    )



})


export {updatevideo}
