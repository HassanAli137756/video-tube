import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {asyncHandler} from '../../utils/asyncHandler.js'
import {uploadImageOnCloundinary, removeFromCloudinary } from '../../utils/cloudinary.js'
import {User} from '../../models/user.models.js'


const updateAccountImages = asyncHandler( async (req, res) =>
{
    let localAvatarPath = ""
    let localCoverPath = ""

    if(req.files?.avatar && req.files?.avatar[0])
    {
        localAvatarPath = req.files.avatar[0].path
    }

    if(req.files?.coverImage && req.files?.coverImage[0])
    {
        localCoverPath = req.files.coverImage[0].path
    }

    if(!localAvatarPath && !localCoverPath)
    {
        throw new ApiError(400, "Please provide image to update");
        
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

    if(localAvatarPath)
    {
        newUploadedAvatar = await uploadImageOnCloundinary(localAvatarPath)
    }

    if(localCoverPath)
    {
        newUploadedCover = await uploadImageOnCloundinary(localCoverPath)
    }

    if(!newUploadedAvatar && newUploadedCover)
    {
        throw new ApiError(500, "Failed to upload new image")

    }



    DBUser.avatarPublicID = newUploadedAvatar?.public_id || DBUser?.avatarPublicID
    DBUser.avatar = newUploadedAvatar?.url || DBUser?.avatar
    DBUser.coverPublicID = newUploadedCover?.public_id || DBUser?.coverPublicID
    DBUser.coverImage = newUploadedCover?.url || DBUser?.coverImage


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