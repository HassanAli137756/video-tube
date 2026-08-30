import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'

const updatePassword = asyncHandler( async (req, res) =>
{
    const {oldPassword, newPassword} = req.body

    console.log("body: ", req.body);
    

    if(!newPassword)
    {
        throw new ApiError(400, "Please provide both new and confirm passwords");

    }

    if(!oldPassword)
    {
        throw new ApiError(400, "Please provide your old account password");

    }







    const user = await User.findById(req.user?._id)

    if(!user)
    {
        throw new ApiError(401, "Unauthorized access, user does not exist");
    }



    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)


    if(!isPasswordCorrect)
    {
        throw new ApiError(401, "Please provide accurate old password");
        
    }

    user.password = newPassword
    

    await user.save({validateBeforeSave: false})


    return res.status(200)
    .json(
        new ApiResponse(200, "User password has updated successfully")
    )



})


export {updatePassword}