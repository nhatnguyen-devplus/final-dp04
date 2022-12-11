import express from 'express'
import multer from 'multer'
import { logOffController } from '../controllers'

const LogOffRouter = express.Router()

LogOffRouter.post('/', multer().none(), logOffController.create)

export default LogOffRouter
