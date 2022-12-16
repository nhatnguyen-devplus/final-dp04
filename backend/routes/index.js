import express from 'express'
import AuthRouter from './authRouter'
import LogOffRouter from './logOffRouter'
import UserGroupRouter from './userGroupRouter'
import UserRouter from './usersRouter'
import NotificationRouter from './notificationRouter'
import dayOffRouter from './dayOffRouter'
const Routes = express.Router()

Routes.use('/api/users', UserRouter)
Routes.use('/api/auth', AuthRouter)
Routes.use('/api/user-groups', UserGroupRouter)
Routes.use('/api/logoff', LogOffRouter)
Routes.use('/api/notification', NotificationRouter)
Routes.use('/api/dayoffs', dayOffRouter)

export default Routes
