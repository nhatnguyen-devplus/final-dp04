import express from 'express'
import { authController } from '../controllers/authController'
import multer from 'multer'
const AuthRouter = express.Router()

AuthRouter.post('/register', multer().none(), authController.register)

AuthRouter.post('/login', multer().none(), authController.login)

export default AuthRouter
