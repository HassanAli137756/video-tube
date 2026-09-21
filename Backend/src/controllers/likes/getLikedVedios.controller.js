
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'
import {Like} from '../../models/like.models.js'
import mongoose from 'mongoose'





const getLikedvideos = asyncHandler( async (req, res) =>
{
    const DBUserId = req.user?._id
 
    if(!DBUserId)
    {
        throw new ApiError(404, "Unauthorized access, user does not exist")
    } 


    
    

    const allLikedvideos = await User.aggregate(
    [
        {
            $match:
            {
                _id: new mongoose.Types.ObjectId(DBUserId)
            }
        },

        {
            $lookup:
            {
                from: "likes",
                localField: "_id",
                foreignField: "liker",
                as: "allLikedvideos",

                pipeline:
                [
                    {
                        $lookup:
                        {
                            from: "videos",
                            localField: "video",
                            foreignField: "_id",
                            as: "video",

                            pipeline:
                            [
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
                                    $addFields:
                                    {
                                        owner:
                                        {
                                            $first: "$owner"
                                        }
                                    }
                                },

                                {
                                    $project:
                                    {
                                        video: 1,
                                        owner: 1,
                                        title: 1,
                                        description: 1,
                                        thumbNail: 1,
                                        duration: 1

                                    }
                                },

                                

                            ]
                        }
                    },

                    {
                        $project:
                        {
                            liker: 0
                        }
                    },

                    {
                        $addFields:
                        {
                            video:
                            {
                                $first: "$video"
                            }
                        }
                    },

                    {
                        $replaceRoot: {
                            newRoot: "$video"
                        }
                    }

                ]

            }
        },

        {
            $project:
            {
                allLikedvideos: 1
            }
        }
        

    ]
    )



    

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched all liked videos", allLikedvideos[0])
    )



})


export {getLikedvideos}