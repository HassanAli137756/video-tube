
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'
import {Like} from '../../models/like.models.js'
import mongoose from 'mongoose'





const getLikedVedios = asyncHandler( async (req, res) =>
{
    const DBUserId = req.user?._id
 
    if(!DBUserId)
    {
        throw new ApiError(404, "Unauthorized access, user does not exist")
    } 


    
    

    const allLikedVedios = await User.aggregate(
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
                as: "allLikedVedios",

                pipeline:
                [
                    {
                        $lookup:
                        {
                            from: "vedios",
                            localField: "vedio",
                            foreignField: "_id",
                            as: "vedio",

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
                                        vedio: 1,
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
                            vedio:
                            {
                                $first: "$vedio"
                            }
                        }
                    },

                    {
                        $replaceRoot: {
                            newRoot: "$vedio"
                        }
                    }

                ]

            }
        },

        {
            $project:
            {
                allLikedVedios: 1
            }
        }
        

    ]
    )



    

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched all liked vedios", allLikedVedios[0])
    )



})


export {getLikedVedios}