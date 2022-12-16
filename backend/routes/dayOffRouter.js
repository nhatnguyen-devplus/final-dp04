import express from 'express'
import multer from 'multer'
import { logOffController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'

const dayOffRouter = express.Router()

dayOffRouter.get('/', CheckAuth, logOffController.getListDayOffs)

export default dayOffRouter
