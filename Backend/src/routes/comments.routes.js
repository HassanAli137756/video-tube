
import {Router} from 'express'
import { verifyJWT } from '../middelwares/auth.middelwares.js'

import {addComment} from '../controllers/comments/addComment.controller.js'
import { deleteComment } from '../controllers/comments/deleteComment.controller.js'
import {updateComment} from '../controllers/comments/updatedComments.controller.js'
import { getAllComments } from '../controllers/comments/getAllComments.controller.js'


const commentRouter = Router()



commentRouter.route('/add-comment/:vedioId').post(verifyJWT, addComment)

commentRouter.route('/delete-comment/:commentId').delete(verifyJWT, deleteComment)

commentRouter.route('/update-comment/:commentId').patch(verifyJWT, updateComment)

commentRouter.route('/get-all-comments').get(verifyJWT, getAllComments)


export {commentRouter}