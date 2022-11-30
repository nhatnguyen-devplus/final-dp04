import express from 'express'
import { authController } from '../controllers/authController'

const AuthRouter = express.Router()

AuthRouter.post('/register', authController.register)

export default AuthRouter
