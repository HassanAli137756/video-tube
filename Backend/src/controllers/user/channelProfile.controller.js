
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'
import mongoose from 'mongoose'

const getUserChannelProfile = asyncHandler( async (req, res) =>
{
    const channelName = req.params?.channelId
    const userId = req.query?.userId
    console.log("User id in controller: ", channelName, userId);
    


    if(!channelName)
    {
        throw new ApiError(404, "Channel not found or exist")
    }

    const userChannelProfile = await User.aggregate(
    [


        {
            $match:
            {
                _id: new mongoose.Types.ObjectId(channelName)
            }
        },

        {
            $lookup:
            {
                from: "vedios",
                localField: "_id",
                foreignField: "owner",
                as: "vedios",

                pipeline:
                [
                    {
                        $lookup:
                        {
                            from: "likes",
                            localField: "_id",
                            foreignField: "vedio",
                            as: "individualLikes"
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
                                        avatar: 1,
                                        email: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:
                        {
                            individualLikes:
                            {
                                $size: "$individualLikes"
                            },
                            owner:
                            {
                                $first: "$owner"
                            }
                        }
                    },
                    {
                        $project:
                        {
                            
                            vedio_publicId: 0,
                            thumbNail_publicId: 0



                        }
                    }
                ]

            }
        },


        {
            $lookup:
            {
                from: "subscriptions",

                localField: '_id',

                foreignField: 'channel',

                as: 'subscribers',

                pipeline:
                [
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: 'subscriber',
                            foreignField: '_id',
                            as: 'subscriber',

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
                        $addFields:
                        {
                            user:
                            {
                                $first: "$subscriber"
                            }
                        }
                    },

                    {
                        $project:
                        {
                            channel: 0,
                            subscriber: 0
                        }
                    }
                ]

            }
        },
        {

            $lookup:
            {
                from: "subscriptions",
                localField: '_id',
                foreignField: 'subscriber',
                as: 'subscribedChannels',

                pipeline:
                [
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: 'channel',
                            foreignField: '_id',
                            as: 'channel',

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
                        $addFields:
                        {
                            user:
                            {
                                $first: "$channel"
                            }
                        }
                    },

                    {
                        $project:
                        {
                            subscriber: 0,
                            channel: 0
                        }
                    }
                ]
            }
        },
        {

            $addFields:
            {

                subscriberCounts:
                {
                    $size: "$subscribers"
                },
                
                subscribedChannelsCounts:
                {
                    $size: "$subscribedChannels"
                },

                isSubscribed: userId ?
                {
                    $cond:
                    {
                        if: {$in: [new mongoose.Types.ObjectId(userId), "$subscribers.subscriber._id"]},
                        then: true,
                        else: false

                    }
                } : false,

                totalLikes:
                {
                    $sum: "$vedios.individualLikes"
                },
                
                totalVedios:
                {
                    $size: "$vedios"
                }
            }
        },

        {
            $project:
            {
                password: 0,
                wathcHistory: 0,
                avatarPublicID: 0,
                coverPublicID: 0,
                refreshToken: 0
            }
        }

        


        



        
    ]
    )

    

    if(!userChannelProfile.length > 0)
    {
        throw new ApiError(500, "There is an error while fetching user profile")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched user profile", userChannelProfile[0])
    )


})



export {getUserChannelProfile}