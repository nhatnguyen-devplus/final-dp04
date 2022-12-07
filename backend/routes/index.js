import express from 'express'
import AuthRouter from './authRouter'
import UserGroupRouter from './userGroupController'
import UserRouter from './usersRouter'
const Routes = express.Router()

Routes.use('/api/users', UserRouter)
Routes.use('/api/auth', AuthRouter)
Routes.use('/api/user-groups', UserGroupRouter)

export default Routes
