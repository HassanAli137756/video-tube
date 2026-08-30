import {asyncHandler} from '../../utils/asyncHandler.js'
import {User} from '../../models/user.models.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Subscription} from '../../models/subscription.models.js'


const subscribeAChannel = asyncHandler( async (req, res) =>
{
    const channel = req.params?.channelId

    const subscriber = req.user?._id

    if(!channel || !subscriber)
    {
        throw new ApiError(400, "channel and subscriber id are essential")
    }

    if(channel == subscriber)
    {
        throw new ApiError(400, "you can't subscribe your channel")

    }

    const isSubscribed = await Subscription.findOne({channel: channel, subscriber: subscriber})

    if(isSubscribed)
    {
        throw new ApiError(403, "you have already subscribed this channel")

    }


    const addedSubscription = await Subscription.create(
    {
        channel,
        subscriber
    }
    )
    
    if(!addedSubscription)
    {
        throw new ApiError(500, "Failed to subscribed channel")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully subscribed channel", addedSubscription)
    )



})



export {subscribeAChannel}