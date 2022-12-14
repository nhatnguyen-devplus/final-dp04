import express from 'express'
import { userController } from '../controllers'
import { isAdmin } from '../generals/isAdmin'
import multer from 'multer'
import { CheckAuth } from '../generals/checkAuth'

const UserRouter = express.Router()

UserRouter.get('/me', CheckAuth, userController.getOne)

UserRouter.get('/:_id', isAdmin, userController.getUser)

UserRouter.get('/', isAdmin, userController.getList)

UserRouter.delete('/:_id', isAdmin, userController.deleteUser)

UserRouter.post('/:_id', multer().none(), CheckAuth, userController.updateUser)

export default UserRouter
