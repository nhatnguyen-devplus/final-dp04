import express from 'express'
import { logOffController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'

const DayOffRouter = express.Router()

DayOffRouter.get('/', CheckAuth, logOffController.getListDayOffs)

export default DayOffRouter
