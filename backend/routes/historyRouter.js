import express from 'express'
import { historyController } from '../controllers/historyController'
const HistoryRouter = express.Router()

HistoryRouter.get('/:_id', historyController.getByRequest)

export default HistoryRouter
