
import {Router} from 'express'
import {verifyJWT} from '../middelwares/auth.middelwares.js'
import { likevideo } from '../controllers/likes/likevideo.contrloler.js'
import { getAllvideosLikes } from '../controllers/likes/getAllvideosLikes.controller.js'
import { getLikedvideos } from '../controllers/likes/getLikedvideos.controller.js'
import { removeLike } from '../controllers/likes/removeLike.controller.js'

const likeRouter = Router()




likeRouter.route('/add-like/:videoId').post(verifyJWT, likevideo)


likeRouter.route('/total-channel-likes').get(verifyJWT, getAllvideosLikes)

likeRouter.route('/get-liked-videos').get(verifyJWT, getLikedvideos)

likeRouter.route('/remove-like/:videoId').delete(verifyJWT, removeLike)




export {likeRouter}