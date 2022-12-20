import express from 'express'
import multer from 'multer'
import { googleSheetController } from '../controllers'
import { CheckAuth } from '../generals/checkAuth'

const SheetGoogleRouter = express.Router()

SheetGoogleRouter.post('/', multer().none(), CheckAuth, googleSheetController.getGoogleSheet)

export default SheetGoogleRouter
