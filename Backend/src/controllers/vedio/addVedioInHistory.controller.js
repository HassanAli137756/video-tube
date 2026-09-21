import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {ApiError} from '../../utils/CustomError.js'
import {User} from '../../models/user.models.js'


const addVedioInHistory = asyncHandler( async (req, res) =>
{
    const userId = req.user?._id
    const vedioId = req.params?.vedioId

    if(!userId  || !vedioId)
    {
        throw new ApiError(401, "Please provide all required credentials ")
    }


    const DBUser = await User.findOne({_id: userId})


    if(!DBUser)
    {
        throw new ApiError(505, "Failed to fetched user from database")
    }

    

    if(DBUser.watchHistory.includes(vedioId))
    {
        return res
        .status(200)
        .json(
            new ApiResponse(200, "Vedio already exist in history")
        )
        

    }

    else
    {

        DBUser.watchHistory.push(vedioId)

        await DBUser.save({validateBeforeSave: false})

        return res
        .status(200)
        .json(
            new ApiResponse(200, "Successfully added vedio to watch History")
        )
        
    }








})


export {addVedioInHistory}