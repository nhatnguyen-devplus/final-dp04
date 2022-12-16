import express from 'express'
import { notificationController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'
import { slackController } from '../controllers/slackController'

const NotificationRouter = express.Router()

NotificationRouter.post('/:_id', CheckAuth, notificationController.update)
NotificationRouter.get('/slack/channels', CheckAuth, slackController.getChannels)
export default NotificationRouter
