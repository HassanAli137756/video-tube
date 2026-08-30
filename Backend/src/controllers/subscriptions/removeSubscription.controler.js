import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {Subscription} from '../../models/subscription.models.js'


const unSubscribeAChannel = asyncHandler( async (req, res) =>
{
    const subscriptionId = req.params?.subscriptionId

    const userId = req.user?._id

    if(!subscriptionId || !userId)
    {
        throw new ApiError(400, "Incomplete credentials, please provide all required fields")
    }

    const subscription = await Subscription.findById(subscriptionId)


    if(!subscription)
    {
        throw new ApiError(404, "Subscription document not found")

    }


    if(!(subscription.subscriber.equals(userId)))
    {
        throw new ApiError(403, "Unauthorized access requester is not the owner of this subscribed document")
    }


    try 
    {
        await Subscription.deleteOne({_id: subscription._id})
    } 
    catch (error) 
    {
        throw new ApiError(500, "Failed to un-subscribed channel")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully un-subscribed channel")
    )




})



export {unSubscribeAChannel}