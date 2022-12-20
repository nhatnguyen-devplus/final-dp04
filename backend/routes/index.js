import express from 'express'
import AuthRouter from './authRouter'
import LogOffRouter from './logOffRouter'
import UserGroupRouter from './userGroupRouter'
import UserRouter from './usersRouter'
import NotificationRouter from './notificationRouter'
import DayOffRouter from './dayOffRouter'
import WorkSpaceRouter from './workSpaceRouter'
import HistoryRouter from './historyRouter'
import SheetGoogleRouter from './sheetGoogleRouter'
const Routes = express.Router()

Routes.use('/api/users', UserRouter)
Routes.use('/api/auth', AuthRouter)
Routes.use('/api/user-groups', UserGroupRouter)
Routes.use('/api/logoff', LogOffRouter)
Routes.use('/api/notification', NotificationRouter)
Routes.use('/api/dayoffs', DayOffRouter)
Routes.use('/api/workspaces', WorkSpaceRouter)
Routes.use('/api/histories', HistoryRouter)
Routes.use('/api/sheet', SheetGoogleRouter)

export default Routes
