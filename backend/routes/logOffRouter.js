import express from 'express'
import multer from 'multer'
import { logOffController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'

const LogOffRouter = express.Router()

LogOffRouter.post('/', CheckAuth, multer().none(), logOffController.create)

LogOffRouter.get('/', CheckAuth, logOffController.getListRequests)

LogOffRouter.get('/:_id', CheckAuth, logOffController.getOne)

LogOffRouter.post('/:_id', CheckAuth, multer().none(), logOffController.update)

export default LogOffRouter
