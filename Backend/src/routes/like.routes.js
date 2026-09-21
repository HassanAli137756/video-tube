
import {Router} from 'express'
import {verifyJWT} from '../middelwares/auth.middelwares.js'
import { likeVedio } from '../controllers/likes/likeVedio.contrloler.js'
import { getAllVediosLikes } from '../controllers/likes/getAllVediosLikes.controller.js'
import { getLikedVedios } from '../controllers/likes/getLikedVedios.controller.js'
import { removeLike } from '../controllers/likes/removeLike.controller.js'

const likeRouter = Router()




likeRouter.route('/add-like/:vedioId').post(verifyJWT, likeVedio)


likeRouter.route('/total-channel-likes').get(verifyJWT, getAllVediosLikes)

likeRouter.route('/get-liked-vedios').get(verifyJWT, getLikedVedios)

likeRouter.route('/remove-like/:vedioId').delete(verifyJWT, removeLike)




export {likeRouter}