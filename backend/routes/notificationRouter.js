import express from 'express'
import { notificationController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'
import { slack } from '../generals/slack'

const NotificationRouter = express.Router()

NotificationRouter.post('/:_id', CheckAuth, notificationController.update)
NotificationRouter.get('/slack/channels', CheckAuth, slack.getChannels)
export default NotificationRouter
