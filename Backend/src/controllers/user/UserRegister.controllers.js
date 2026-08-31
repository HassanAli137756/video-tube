import {asyncHandler} from '../../utils/asyncHandler.js'
import {User} from '../../models/user.models.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {uploadImageOnCloundinary} from '../../utils/cloudinary.js'
import fs from 'fs'


const userRegister = asyncHandler(async (req, res, next) =>
{
    
    const {userName, email, password, fullName} = req.body


    const localAvatarPath = req.files?.avatar[0]?.path
    let localCoverImagePath = null

    if(req.files?.coverImage && req.files?.coverImage[0]?.path)
    {
        localCoverImagePath = req.files.coverImage[0].path
    }


    if(

        [userName, email, password, fullName].some(field => field?.trim() === "")
    )
    {

        
        throw new ApiError(400, 'All fields are required')
    }


    
    if(!localAvatarPath) 
    {
        if(localCoverImagePath) fs.unlinkSync(localAvatarPath)
        throw new ApiError(400, 'Avatar is required field')
    }


  
    const registeredUser = await User.findOne(
    {
        
        $or: [{email}, {userName}]
    }
    )


    if(registeredUser)
    {
        if(localCoverImagePath) fs.unlinkSync(localCoverImagePath)
        if(localAvatarPath) fs.unlinkSync(localAvatarPath)


        throw new ApiError(400, "User with this name or email already existed")
    }



    const cloudinaryAvatar = await uploadImageOnCloundinary(localAvatarPath)
    let cloudinaryCoverImage = null

    if(!cloudinaryAvatar)
    {
        throw new ApiError(500, 'Failed to upload image please try again')
    }

    if(localCoverImagePath)
    {
        const uploadedCoverImage = await uploadImageOnCloundinary(localCoverImagePath)

        if(!uploadedCoverImage)
        {
            throw new ApiError(500, "Fialed to upload cover image please try again")
        }
        
        cloudinaryCoverImage = uploadedCoverImage
    }

    const newRegisteredUser = await User.create(
    {
        avatar: cloudinaryAvatar.secure_url,
        coverImage: cloudinaryCoverImage?.secure_url || '',
        email,
        fullName,
        password,
        userName,
        avatarPublicID: cloudinaryAvatar.public_id,
        coverPublicID: cloudinaryCoverImage?.public_id || "",

    }
    )

    const newCreatedUser = await User.findOne(newRegisteredUser._id).select("-password -refreshToken")


    if(!newCreatedUser)
    {
        throw new ApiError(500, "Failed to register please try again")
    }


    console.log("Ready to sending success response", newCreatedUser);
    

    return res.status(201)
    .json(
        new ApiResponse(200, "Successfully registered user", newCreatedUser)
    )



})

export {userRegister}
