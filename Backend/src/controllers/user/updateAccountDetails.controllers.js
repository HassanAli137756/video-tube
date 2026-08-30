
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'


const updateAccountDetails = asyncHandler( async (req, res) =>
{
    const {email, password, fullName} = req.body

    
    if(!password)
    {
        throw new ApiError(400, "Please provide password to update accout details")
    }

    if(!email && !fullName)
    {
        throw new ApiError(400, "Please provide at least one field to update")
    }



    const DBUser = await User.findById(req.user?._id).select("-refreshToken")


    if(!DBUser)
    {
        throw new ApiError(401, "User is not existed in database")
    }

    const isUserExist = await User.findOne(
    {
        email: email
    }
    )

    
    if(isUserExist.email !== DBUser.email)
    {
        throw new ApiError(403, "Please select another email, user with given email already existed ")
    }
    
    const isPasswordCorrect = await DBUser.isPasswordCorrect(password)


    if(!isPasswordCorrect)
    {
        throw new ApiError(400, "Please provide correct password")
    }


    if(email && email.length > 0)
    {
        DBUser.email = email
    }

    if(fullName && fullName.length > 0)
    {
        DBUser.fullName = fullName
    }



    await DBUser.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully updated account details", DBUser)
    )


})


export {updateAccountDetails}


