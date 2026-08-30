
import {asyncHandler} from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'
import {User} from '../../models/user.models.js'


// ********************** FLOW ************************
// 1. First of all, a middleware named "verifyJWT" is using before this controller in router.route
// 2. middelware add a custom property in the req of controller named "user"
// 3. custom added property can be access through req.user which provide a proper user docemnet stored in mongoDB
// 4. make DB query based on ._id comming from req.user
// 5. along with DB quer update value of refresh token i.e; replacing it with undefined, which is the main task of logout


const userLogout = asyncHandler( async (req, res) =>
{

    

    // userLogout will only execute if middelware add user property, otherwise if an error occure middelware will throw an error due to which controlls will exit out 
    // so, without checking req.user._id, DB query is sending
    await User.findByIdAndUpdate(
        req.user._id,
        {
            // operator $set will set only a specific value of DB docement
            $set: 
            {
                refreshToken: ""
            }
        }
    )


    

    const cookieSecurityOptions =
    {
        httpOnly: true,
        secure: true
    }


    // sending response and removing cookies named, accessToken and refreshToken
    return res.status(200)
    .clearCookie("accessToken", cookieSecurityOptions)
    .clearCookie("refreshToken", cookieSecurityOptions)
    .json(
        new ApiResponse(200, "Successfully LoggedOut User", null)
    )
    



})

export {userLogout}










