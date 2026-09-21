
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Comment} from '../../models/comment.models.js'
import {Like} from '../../models/like.models.js'
import {User} from '../../models/user.models.js'
import {video} from '../../models/video.models.js'



const getAllvideos = asyncHandler( async (req, res) =>
{
    const videos = await video
    .find({"isPublished":true}, "thumbNail video owner title duration createdAt")
    .populate("owner", "avatar email userName")




    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully served request", videos)
    )


})


export {getAllvideos}