
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'
import mongoose from 'mongoose'

const getUserActivitiesCount = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id
    const inCommingUserId = req.params?.userId


    


    if(!userId || !inCommingUserId)
    {
        throw new ApiError(404, "Channel not found or exist")
    }

    if(!userId.equals(inCommingUserId))
    {
        throw new ApiError(404, `Requester and db user are not same`)
    }

    const activitiesCount = await User.aggregate(
    [
        {
            $match:
            {
                "_id": new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $lookup:
            {
                from: "comments",
                localField: "_id",
                foreignField: "commenter",
                as: "commentsCount",

            }
        },

        {
            $lookup:
            {
                from: "likes",
                localField: "_id",
                foreignField: "liker",
                as: "likedVediosCount",

            }
        },

        {
            $addFields:
            {
                commentsCount:
                {
                    $size: "$commentsCount"
                },

                likedVediosCount:
                {
                    $size: "$likedVediosCount"
                },

                watchedVediosCount:
                {
                    $size: "$watchHistory"
                }
            }
        },

        {
            $project:
            {
                commentsCount: 1,
                likedVediosCount: 1,
                watchedVediosCount: 1
            }
        }
    ]
    )

    

    

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched user activities stats", activitiesCount[0])
    )


})



export {getUserActivitiesCount}