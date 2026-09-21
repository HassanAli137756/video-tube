



import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {video} from '../../models/video.models.js'
import mongoose from 'mongoose'
import { Subscription } from '../../models/subscription.models.js'




const getvideoDetails = asyncHandler( async (req, res) =>
{
    
    const videoId = req.params?.videoId
    const userId = req?.query?.userId
    let subscriptionDoc = {}


    console.log("videoId in getvideoDetails:", videoId);
    console.log("UserId in getvideoDetails:", userId);
    


    if(!videoId)
    {
        throw new ApiError(404, "Something went wrong video does not found")
    }

/* 
    if(userId)
    {
        subscriptionDoc = Subscription.findOne({channel: new mongoose.Types.ObjectId()})
    }
 */

    const videoDetails = await video.aggregate(
    [
        {
            $match:
            {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },


        {
            $lookup:
            {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",

                pipeline:
                [
                    {
                        $project:
                        {
                            userName: 1,
                            email: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        
        {
            $lookup:
            {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "allLikes"
            }
        },

        {
            $addFields:
            {
                likesCounts:
                {
                    $size: "$allLikes"
                },

                owner:
                {
                    $first: "$owner"
                },

                isLiked: userId ?
                {
                    $cond:
                    {
                        if: {$in: [new mongoose.Types.ObjectId(userId), "$allLikes.liker"]},
                        then: true,
                        else: false
                    }
                }: false
            }
        },


        {
            $lookup:
            {
                from: "comments",
                localField: "_id",
                foreignField: "video",
                as: "allcomments",


                pipeline:
                [
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: "commenter",
                            foreignField: "_id",
                            as: "commenter",


                            pipeline:
                            [
                                {
                                    $project:
                                    {
                                        userName: 1,
                                        avatar: 1,
                                    }
                                }
                            ]
                        }
                    },

                    {
                        $addFields:
                        {
                            commenter:
                            {
                                $first: "$commenter"
                            }
                        }
                    },
                    {
                        $project:
                        {
                            commentedvideo: 0
                        }
                    }
                ]
            }
        },

        {
            $project:
            {
                allLikes: 0,
                video_publicId: 0,
                thumbNail_publicId: 0,
                
            }
        }

    ]
    )

    if(userId)
    {
        subscriptionDoc = await Subscription.findOne({channel: videoDetails[0].owner?._id, subscriber: userId})
    }



    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched video details", {...videoDetails[0], subscriptionDoc: subscriptionDoc || {}})
    )




})


export {getvideoDetails}
