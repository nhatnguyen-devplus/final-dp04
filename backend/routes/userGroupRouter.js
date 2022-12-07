import express from 'express'
import multer from 'multer'
import { userGroupController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'
import { isAdmin } from '../generals/isAdmin'

const UserGroupRouter = express.Router()

UserGroupRouter.get('/:_id', CheckAuth, userGroupController.getOne)

UserGroupRouter.get('/', isAdmin, userGroupController.getList)

UserGroupRouter.post('/', multer().none(), isAdmin, userGroupController.createUserGroup)

UserGroupRouter.delete('/:_id', isAdmin, userGroupController.deleteUserGroup)

export default UserGroupRouter
