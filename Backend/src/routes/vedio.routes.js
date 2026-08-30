
import {Router} from 'express'
import { verifyJWT } from '../middelwares/auth.middelwares.js'
import { uploader } from '../middelwares/multer.middleware.js'
import {deleteVedio} from '../controllers/vedio/deleteVedio.controller.controller.js'
import {getVedioDetails} from '../controllers/vedio/getVedioDetails.contrller.js'
import {updateVedio} from '../controllers/vedio/updateVedio.controller.js'
import {uploadVedio} from '../controllers/vedio/uploadVedio.controller.js'
import {getWatchHistory} from '../controllers/vedio/watchHistory.controllers.js'
import multer from 'multer'
import {getUserUploadedVedios} from '../controllers/vedio/getUserUploadedVedios.controller.js'
import {getAllVedios} from '../controllers/vedio/getAllVedios.controller.js'
import {addVedioInHistory} from '../controllers/vedio/addVedioInHistory.controller.js'
import {removeVedioFromHistory} from '../controllers/vedio/removeVedioFromWatch.js'



const vedioRouter = Router()


vedioRouter.
route('/upload-vedio').
post(
    verifyJWT, 
    uploader.fields(
    [
        {
            name: "thumbNail",
            maxCount: 1
        },

        {
            name: "vedio",
            maxCount: 1
        }
    ]
    ), uploadVedio )




vedioRouter.route('/update-vedio/:vedioId').patch(verifyJWT, uploader.single('thumbNail'), updateVedio)

vedioRouter.route('/delete-vedio/:vedioId').delete(verifyJWT, deleteVedio)

vedioRouter.route('/get-vedio-info/:vedioId').get( getVedioDetails)

vedioRouter.route('/get-user-vedios').get(verifyJWT, getUserUploadedVedios)

vedioRouter.route('/get-all-vedios').get(getAllVedios)

vedioRouter.route('/get-watch-history/:userId').get(verifyJWT, getWatchHistory)

vedioRouter.route('/add-vedio-in-history/:vedioId').post(verifyJWT, addVedioInHistory)

vedioRouter.route('/remove-vedio-from-history/:vedioId').delete(verifyJWT, removeVedioFromHistory)

export {vedioRouter}


