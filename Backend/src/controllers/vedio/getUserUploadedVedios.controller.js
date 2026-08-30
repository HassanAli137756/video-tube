
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Comment} from '../../models/comment.models.js'
import {Like} from '../../models/like.models.js'
import {User} from '../../models/user.models.js'
import {Vedio} from '../../models/vedio.models.js'



const getUserUploadedVedios = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id

    if(!userId)
    {
        throw new ApiError(400, "User_id not provided")
    }


    const vedios = await Vedio
    .find({"owner": userId}, "-vedio_publicId -owner -thumbNail_publicId -vedio")




    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully served request", vedios)
    )


})

export {getUserUploadedVedios}