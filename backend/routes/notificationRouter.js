import express from 'express'
import { notificationController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'

const NotificationRouter = express.Router()

NotificationRouter.post('/:_id', CheckAuth, notificationController.update)

export default NotificationRouter
