
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'
import mongoose from 'mongoose'


const getWatchHistory = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id
    const inCommingUserId = req.params?.userId

    if(!userId || !inCommingUserId)
    {
        throw new ApiError(400, "Something went wrong, user is not provided")
    }

    if(!userId.equals(inCommingUserId))
    {
        throw new ApiError(400, `Something went wrong, you are not the owner of this channel Incomming: ${inCommingUserId} && userId: ${userId}`)
    }


    
    const userWatchHistory = await User.aggregate(
    [

        {
            
            $match:
            {
                
                _id: new mongoose.Types.ObjectId(userId)
            }
        },


        {
            
            $lookup:
            {

                
                from: "vedios",
                localField: 'watchHistory',
                foreignField: '_id',
                as: 'watchHistory',



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
                            thumbNail: 1,
                            vedio: 1,
                            owner: 1,
                            duration: 1,
                            title: 1,
                            isPublished: 1

                        }
                    }

                ],




            }
        },

        {
            $project:
            {
                watchHistory: 1,
                userName: 1,
                avatar: 1,
                email: 1
            }
        }
    ]
    )



    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched user watch-History", userWatchHistory[0])
    )


})


export {getWatchHistory}