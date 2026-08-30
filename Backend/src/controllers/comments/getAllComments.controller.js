import mongoose from "mongoose";
import { Comment } from "../../models/comment.models.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/CustomError.js";
import { ApiResponse } from "../../utils/CustomResponse.js";

const getAllComments = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id

    if(!userId)
    {
        throw new ApiError(400, "User is not provided")
    }


    const allComments = await Comment.aggregate(
    [
        {
            $match:
            {
                commenter : userId
            }
        },

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
                                        avatar: 1,
                                        userName: 1,
                                        email: 1
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
                            avatar: 1,
                            vedio: 1,
                            userName: 1,
                            email: 1,
                            owner: 1,
                            duration: 1,
                            thumbNail: 1
                        }
                    }
                ]
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
        }

        
    ]
    )

    console.log("AllComments: ", allComments);
    



    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched comments with vedios", allComments)
    )


})


export {getAllComments}