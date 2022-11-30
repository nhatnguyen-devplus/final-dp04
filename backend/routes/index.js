import express from 'express'
import AuthRouter from './authRouter'
import UserRouter from './usersRouter'
const Routes = express.Router()

Routes.use('/api/users', UserRouter)
Routes.use('/api/auth', AuthRouter)

export default Routes
