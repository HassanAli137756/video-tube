
import {Router} from 'express'
import { verifyJWT } from '../middelwares/auth.middelwares.js'
import { uploader } from '../middelwares/multer.middleware.js'
import {deletevideo} from '../controllers/video/deletevideo.controller.controller.js'
import {getvideoDetails} from '../controllers/video/getvideoDetails.contrller.js'
import {updatevideo} from '../controllers/video/updatevideo.controller.js'
import {uploadvideo} from '../controllers/video/uploadvideo.controller.js'
import {getWatchHistory} from '../controllers/video/watchHistory.controllers.js'
import multer from 'multer'
import {getUserUploadedvideos} from '../controllers/video/getUserUploadedvideos.controller.js'
import {getAllvideos} from '../controllers/video/getAllvideos.controller.js'
import {addvideoInHistory} from '../controllers/video/addvideoInHistory.controller.js'
import {removevideoFromHistory} from '../controllers/video/removevideoFromWatch.js'



const videoRouter = Router()


videoRouter.
route('/upload-video').
post(
    verifyJWT, 
    uploader.fields(
    [
        {
            name: "thumbNail",
            maxCount: 1
        },

        {
            name: "video",
            maxCount: 1
        }
    ]
    ), uploadvideo )




videoRouter.route('/update-video/:videoId').patch(verifyJWT, uploader.single('thumbNail'), updatevideo)

videoRouter.route('/delete-video/:videoId').delete(verifyJWT, deletevideo)

videoRouter.route('/get-video-info/:videoId').get( getvideoDetails)

videoRouter.route('/get-user-videos').get(verifyJWT, getUserUploadedvideos)

videoRouter.route('/get-all-videos').get(getAllvideos)

videoRouter.route('/get-watch-history/:userId').get(verifyJWT, getWatchHistory)

videoRouter.route('/add-video-in-history/:videoId').post(verifyJWT, addvideoInHistory)

videoRouter.route('/remove-video-from-history/:videoId').delete(verifyJWT, removevideoFromHistory)

export {videoRouter}


