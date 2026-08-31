
import {asyncHandler} from '../../utils/asyncHandler.js'
import {User} from '../../models/user.models.js'
import {ApiError} from '../../utils/CustomError.js'
import {ApiResponse} from '../../utils/CustomResponse.js'

const generateAccessAndRefreshTokens = async (userID) =>
{
    try {
        const DBUser = await User.findById(userID)
    
        const accessToken = await DBUser.generateAccessToken()
        const refreshToken = await DBUser.generateRefreshToken()
    
        DBUser.refreshToken = refreshToken
    

        await DBUser.save({validateBeforeSave: false});
    
        return {accessToken, refreshToken}
    } 
    catch(error) 
    {
        throw new ApiError(500, "There is an error while generating access and refresh tokens");
        
    }

}



const userLogin = asyncHandler( async (req, res) =>
{
    



    // obtaining user Data
    const {userRefrence, password} = req.body


    console.log("UserRef in backend", userRefrence, password);
    

    // validating user data for essentials fields
    if(!userRefrence && !password)
    {
        throw new ApiError(401, "Please provide email or userName and password")
    }


    // getting whole DataBase saved user document based on user-given data
    const DBUser = await User.findOne(
    {
        $or: [{email: userRefrence}, {userName: userRefrence}]
    }
    )

    if(!DBUser)
    {
        throw new ApiError(401, "User with given credentials does not exist")

    }



    // checking password
    const isPasswordValidate = await DBUser.isPasswordCorrect(password)


    if(!isPasswordValidate)
    {
        throw new ApiError(401, "Invalid credentials")
    }


    // generating access and refresh tokens
    const {refreshToken, accessToken} = await generateAccessAndRefreshTokens(DBUser._id)
    


    // getting updated DB user document to give it in response
    const loggedInUser = await User.findById(DBUser._id).select("-password -refreshToken")



    // setting cookies securities options
    const cookieSecurtiyOptions = 
    {
        // httpOnly will convert given cookie in such a fromat which can only be read by server, which increase security and, reduce hacking chances
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }


    res
    .status(200)
    .cookie("accessToken", accessToken, cookieSecurtiyOptions)
    .cookie("refreshToken", refreshToken, cookieSecurtiyOptions)
    .json(
        new ApiResponse(200, "Successfully loggedIn User", {loggedInUser, refreshToken, accessToken})
    )



})


export {userLogin, generateAccessAndRefreshTokens}
