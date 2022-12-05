import express from 'express'
import { authController } from '../controllers/authController'
import multer from 'multer'

const AuthRouter = express.Router()

AuthRouter.post('/register', multer().none(), authController.register)

AuthRouter.post('/login', multer().none(), (req, res) => {
  if (!req.headers.authorization) {
    return authController.login(req, res)
  }
  return authController.loginGG(req, res)
})

export default AuthRouter
