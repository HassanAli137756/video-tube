
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Vedio} from '../../models/vedio.models.js'
import { uploadImageOnCloundinary , removeFromCloudinary } from '../../utils/cloudinary.js'



const updateVedio = asyncHandler( async (req, res) =>
{
    
    if(!req.body)
        {
            throw new ApiError(401, "body is not provided or it is undefined")
            
        }
        
        
    const userId = req.user?._id
    const {title, description, isPublished} = req?.body
    const thumbNail = req.file?.path
    const vedioId = req.params?.vedioId


    console.log("ThumbNail in vedio controller", thumbNail);
    
    

    if(!userId)
    {
        throw new ApiError(401, "Unauthorized access, user does not exist")
    }

    if(!vedioId)
    {
        throw new ApiError(400, "Vedio id is not provided")
    }


    if(!title?.trim() && !description?.trim() && !thumbNail && !(typeof isPublished == "boolean"))
    {
       throw new ApiError(400, "Please provide atleast one field to update") 
    }


    const DBVedio = await Vedio.findById(vedioId)

    if(!DBVedio)
    {
       throw new ApiError(404, "vedio not exist") 
    }


    if(!DBVedio.owner.equals(userId))
    {
       throw new ApiError(401, "unauthorized action, user is not owner of vedio") 

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

        oldThumbnailId = DBVedio.thumbNail_publicId
    }

    if(title?.trim())
    {
        DBVedio.title = title
    }

    if(description?.trim())
    {
        DBVedio.description = description
    }

    if(typeof isPublished == "boolean")
    {
        DBVedio.isPublished = isPublished
    }

    if(isThumbNailProvided && newUploadedThumbnail.url && oldThumbnailId.length > 0)
    {
        DBVedio.thumbNail = newUploadedThumbnail.url
        DBVedio.thumbNail_publicId = newUploadedThumbnail.public_id
    }


    await DBVedio.save({validateBeforeSave: false})

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


export {updateVedio}
