
import {asyncHandler} from '../../utils/asyncHandler.js'
import {User} from '../../models/user.models.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Subscription} from '../../models/subscription.models.js'
import mongoose from 'mongoose'





const getUserSubscribedChannels = asyncHandler( async (req, res) =>
{

    const userId = req.user?._id


    if(!userId)
    {
        throw new ApiError(403, "Unauthorized access user is not found")
    }


    const subscribedChannels = 
    await Subscription
    .find({subscriber: new mongoose.Types.ObjectId(userId)})
    .populate("channel", "userName avatar email")

    

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched all subscribed users", subscribedChannels)
    )


    /* 
    const subscribedChannels = await Subscription.aggregate(
    [
        {
            $match:
            {
                subscriber: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $lookup:
            {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channel"
            }
        }
    ]
    ) 
    */



})


export {getUserSubscribedChannels}