
import {Router} from 'express'
import {verifyJWT} from '../middelwares/auth.middelwares.js'
import { subscribeAChannel } from '../controllers/subscriptions/addSubscription.controller.js'
import { unSubscribeAChannel } from '../controllers/subscriptions/removeSubscription.controler.js'
import { getUserSubscribedChannels } from '../controllers/subscriptions/getSubscribedChannels.controller.js'



const subscriptionRouter = Router()




subscriptionRouter.route('/subscribeAChannel/:channelId').post(verifyJWT, subscribeAChannel)


subscriptionRouter.route('/un-subscribeAChannel/:subscriptionId').delete(verifyJWT, unSubscribeAChannel)


subscriptionRouter.route('/get-subscribed-channels').get(verifyJWT, getUserSubscribedChannels)




export {subscriptionRouter}

