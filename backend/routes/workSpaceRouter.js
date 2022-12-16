import express from 'express'
import { workSpaceController } from '../controllers'
import { isAdmin } from '../generals/isAdmin'

const WorkSpaceRouter = express.Router()

WorkSpaceRouter.post('/', isAdmin, workSpaceController.create)

WorkSpaceRouter.post('/:_id', isAdmin, workSpaceController.update)

WorkSpaceRouter.get('/:_id', isAdmin, workSpaceController.getOne)

WorkSpaceRouter.get('/', isAdmin, workSpaceController.getList)

export default WorkSpaceRouter
