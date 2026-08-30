
import {Router} from 'express'
import {userRegister} from '../controllers/user/UserRegister.controllers.js'
import {uploader} from '../middelwares/multer.middleware.js'
import { userLogin } from '../controllers/user/userLogin.controllers.js'
import { getUserChannelProfile } from '../controllers/user/channelProfile.controller.js'
import { verifyJWT } from '../middelwares/auth.middelwares.js'
import { userLogout } from '../controllers/user/userLogout.controllers.js'
import { getUser } from '../controllers/user/getUser.controllers.js'
import { updateAccountDetails } from '../controllers/user/updateAccountDetails.controllers.js'
import { updatePassword } from '../controllers/user/updatePassword.controllers.js'
import { getUserActivitiesCount } from '../controllers/user/getUserHistory.controller.js'
import { refreshingAccessToken } from '../controllers/user/refrshingAccessToken.controllers.js'
import { updateAccountImages } from '../controllers/user/updateAccountImages.controller.js'

const userRouter = Router()


userRouter.route('/user-register').post(uploader.fields(
[
    {
        name: 'avatar',
        maxCount: 1
    },
    {
        name: 'coverImage',
        maxCount: 1
    }
]
),userRegister)


userRouter.route('/user-login').post(userLogin)

userRouter.route('/get-user').get(verifyJWT, getUser)

userRouter.route('/user-channel-profile/:channelId').post(getUserChannelProfile)

userRouter.route('/user-logout').get(verifyJWT, userLogout)


userRouter.route('/update-account-details').patch(verifyJWT, updateAccountDetails)

userRouter.route('/get-activities-count/:userId').get(verifyJWT, getUserActivitiesCount)

userRouter.route('/update-password').post(verifyJWT, updatePassword)


userRouter.route('/update-account-images').post(verifyJWT, uploader.fields(
[
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]
) , updateAccountImages)




userRouter.route('/refresh-access-token').post( refreshingAccessToken)


export {userRouter} 