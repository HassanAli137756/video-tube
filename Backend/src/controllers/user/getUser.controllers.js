
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'


const getUser = asyncHandler( async (req, res) =>
{
    const DBUser = req.user

    if(!req.user)
    {
        throw new ApiError(500, "Failed to fetch user please try latter")
    }


    return res
    .status(200)
    .json(new ApiResponse(200, "Successfully fetched user from database", DBUser))


})

export {getUser}




