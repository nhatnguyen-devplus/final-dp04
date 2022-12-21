import express from 'express'
import { historyController } from '../controllers/historyController'
import { CheckAuth } from '../generals/checkAuth'
const HistoryRouter = express.Router()

HistoryRouter.get('/:_id', CheckAuth, historyController.getByRequest)

export default HistoryRouter
