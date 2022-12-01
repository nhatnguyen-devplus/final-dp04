import express from 'express'
import { userController } from '../controllers'
import { isAdmin } from '../generals/isAdmin'
import multer from 'multer'

const UserRouter = express.Router()

UserRouter.get('/me', userController.getOne)

UserRouter.get('/', isAdmin, userController.getList)

UserRouter.delete('/', isAdmin, userController.deleteUser)

UserRouter.post('/:_id', multer().none(), userController.updateUser)

export default UserRouter
