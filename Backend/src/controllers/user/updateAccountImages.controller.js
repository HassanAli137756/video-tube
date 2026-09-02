import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {asyncHandler} from '../../utils/asyncHandler.js'
import {uploadImageOnCloundinary, removeFromCloudinary } from '../../utils/cloudinary.js'
import {User} from '../../models/user.models.js'


const updateAccountImages = asyncHandler( async (req, res) =>
{
    let localAvatarFile = ""
    let localCoverFile = ""

    if(req.files?.avatar && req.files?.avatar[0])
    {
        localAvatarFile = req.files.avatar[0].buffer
    }

    if(req.files?.coverImage && req.files?.coverImage[0])
    {
        localCoverFile = req.files.coverImage[0].buffer
    }

    if(!localAvatarFile && !localCoverFile)
    {
        throw new ApiResponse(200, "failed to upload", req.files?.avatar[0])
        
    }


    const DBUser = await User.findById(req.user?._id)

    if(!DBUser)
    {
        throw new ApiError(401, "User is not exist in database");
        
    }
    const oldAvatarPublicID = DBUser.avatarPublicID || ""
    const oldCoverPublicID = DBUser.coverPublicID || ""



    
    let newUploadedAvatar = {}
    let newUploadedCover = {}

    if(localAvatarFile)
    {
        newUploadedAvatar = await uploadImageOnCloundinary(localAvatarFile)
    }

    if(localCoverFile)
    {
        newUploadedCover = await uploadImageOnCloundinary(localCoverFile)
    }

    if(!newUploadedAvatar && newUploadedCover)
    {
        throw new ApiError(500, "Failed to upload new image")

    }

    console.log("New uploaded avatar", newUploadedAvatar);
    


    DBUser.avatarPublicID = newUploadedAvatar?.public_id || DBUser?.avatarPublicID
    DBUser.avatar = newUploadedAvatar?.secure_url || DBUser?.avatar
    DBUser.coverPublicID = newUploadedCover?.public_id || DBUser?.coverPublicID
    DBUser.coverImage = newUploadedCover?.secure_url || DBUser?.coverImage


    const isUserSaved = await DBUser.save({validateBeforeSave: false})

    if(!isUserSaved)
    {
        
        await removeFromCloudinary(newUploadedAvatar?.public_id)
        await removeFromCloudinary(newUploadedCover?.public_id)
        throw new ApiError(500, "Failed to update image")
    }


    
    const isExistingAvatarRomoved = await removeFromCloudinary(oldAvatarPublicID)
    const isExistingCoverRomoved = await removeFromCloudinary(oldCoverPublicID)
    
    if(isExistingAvatarRomoved)
    {
        console.log("Successfully removed avatar", isExistingAvatarRomoved);
    }
    
    if(isExistingCoverRomoved)
    {
        console.log("Successfully removed coverImage", isExistingCoverRomoved);
    }


    return res.status(200)
    .json(
        new ApiResponse(200, "Successfully updated images", DBUser)
    )
    


})



export {updateAccountImages}