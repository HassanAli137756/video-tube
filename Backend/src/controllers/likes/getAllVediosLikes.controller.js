
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Like} from '../../models/like.models.js'
import {video} from '../../models/video.models.js'
import mongoose from 'mongoose'


const getAllvideosLikes = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id

    if(!userId)
    {
        throw new ApiError(400, "UserId is not provided")
    }

    const uservideosInfo = await video.aggregate(
    [
        {
            $match:
            {
                "owner": new mongoose.Types.ObjectId(userId)
            }
        },

        
        

        {
            $lookup:
            {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likers"
            }
        },

        {
            $addFields:
            {
                totalLikesCounts:
                {
                    $size: "$likers"
                }
            }
        },

        {
            $group:
            {
               _id: null,
                totalLikes:
                {
                    $sum: "$totalLikesCounts"
                },
                totalvideos:
                {
                    $sum: 1
                }
            }
        }
        
    ]
    )


    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully served request", uservideosInfo[0])
    )



})


export {getAllvideosLikes}




