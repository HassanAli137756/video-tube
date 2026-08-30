
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {uploadImageOnCloundinary, removeFromCloudinary} from '../../utils/cloudinary.js'
import {User} from '../../models/user.models.js'

const updateCoverImage = asyncHandler( async (req, res) =>
{
    // ******************  FLOW  ***************************
    // 1. getting file from req.file, which is setted by multermiddlewar
    // 2. apply validation on local saved image
    // 3. upload updated image on cloudinary
    // 4. if updated image has uploaded, store it's required fields in DB
    // 5. if required info has saved in DB then remove image from cloudinary, and send response to user



    // getting local image file path as multermiddelware has setted file info in req.file
    const locaSavedImage = req.file?.path






    if(!locaSavedImage)
    {
        throw new ApiError(400, "Please provide image to upload")
    }






    // getting DB saved user from req.user._id, as .user has full DB saved user which was setted by "verifyJWT" middleware
    const DBUser = await User.findById(req.user._id)





    if(!DBUser)
    {
        throw new ApiError(500, "Failed to find user from database")

    }




    // storing public_id of old image which will be removed from cloudinary, after storing new image publid_id and url in DB
    const oldImagePublicID = DBUser.avatarPublicID






    const newUploadedImage = await uploadImageOnCloundinary(locaSavedImage)
    if(!newUploadedImage)
    {
        throw new ApiError(500, "Failded to uploade updated image")
        
    }


    DBUser.avatar = newUploadedImage.url
    DBUser.avatarPublicID = newUploadedImage.public_id


    const isDBUpdated = await DBUser.save({validateBeforeSave: false})


    if(!isDBUpdated)
    {
        await removeFromCloudinary(newUploadedImage.public_id)
        throw new ApiError(400, "Failed to update cover image")
    }


    
    

    // now trying to remove old image at this stage, as if we remove it from cloudinary after uploading new image and before of storing new image data in DB, then it may be possible that DB may be failed to store info of new uploaded image and then DB will has url and public_id of such image which has removed from cloudinary
    let removingExistingImage;
    if(oldImagePublicID && oldImagePublicID.length > 0)
    {
        removingExistingImage = await removeFromCloudinary(oldImagePublicID)
    }


    


    // storing refrence of to send a more deep message in response
    let isExistingImageRomved = true


    if(!removingExistingImage)
    {
        isExistingImageRomved = false



        // in this case we are not throwing error, as main task has completed at this stage i.e new image has uploaded on cloudinary whose info also has stored in DB
        // so when user se 500 error and then refresh page it will found image has updated, which can distrub its thought about functionality
        console.log("Failed to remove existing cover Image in updateCoverImage controller")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(200, `Successfully updated cover image ${!isExistingImageRomved ? ', but failed in removing existing image from cloudinary' : ''}`)
    )


})


export {updateCoverImage}


