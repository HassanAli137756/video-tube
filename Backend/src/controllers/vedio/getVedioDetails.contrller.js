



import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Vedio} from '../../models/vedio.models.js'
import mongoose from 'mongoose'
import { Subscription } from '../../models/subscription.models.js'




const getVedioDetails = asyncHandler( async (req, res) =>
{
    
    const vedioId = req.params?.vedioId
    const userId = req?.query?.userId
    let subscriptionDoc = {}


    console.log("vedioId in getVedioDetails:", vedioId);
    console.log("UserId in getVedioDetails:", userId);
    


    if(!vedioId)
    {
        throw new ApiError(404, "Something went wrong vedio does not found")
    }

/* 
    if(userId)
    {
        subscriptionDoc = Subscription.findOne({channel: new mongoose.Types.ObjectId()})
    }
 */

    const vedioDetails = await Vedio.aggregate(
    [
        {
            $match:
            {
                _id: new mongoose.Types.ObjectId(vedioId)
            }
        },
/* 
        {
            
            $lookup:
            {
                from: "subscriptions",
                localField: "owner",
                foreignField: "channel",
                as: "allOwnerSubscribers",

                pipeline:
                [
                    {
                        $match:
                        {

                        }
                    }
                ]
            }
            
        }, */

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
                foreignField: "vedio",
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
                foreignField: "vedio",
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
                            commentedVedio: 0
                        }
                    }
                ]
            }
        },

        {
            $project:
            {
                allLikes: 0,
                vedio_publicId: 0,
                thumbNail_publicId: 0,
                
            }
        }

    ]
    )

    if(userId)
    {
        subscriptionDoc = await Subscription.findOne({channel: vedioDetails[0].owner?._id, subscriber: userId})
    }



    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched vedio details", {...vedioDetails[0], subscriptionDoc: subscriptionDoc || {}})
    )




})


export {getVedioDetails}
