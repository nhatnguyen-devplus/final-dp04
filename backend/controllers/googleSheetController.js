import moment from 'moment'
import { errors } from '../constants'
import * as credentials from '../credentials.json'
const { GoogleSpreadsheet } = require('google-spreadsheet')
import { Helper, ResponseBase } from '../generals'
import { logOffService } from '../services'

const CLIENT_EMAIL = process.env.SHEET_CLIENT_EMAIL
const PRIVATE_KEY = credentials.private_key

const getGoogleSheet = async (req, res) => {
  const { from, to, type, spreadsheetId, status } = req.body
  if (!type) return res.json(errors.ERROR_INPUT)
  const dayOffs = await logOffService.getListByDay(from, to, status)
  try {
    if (type === 'Download') {
      return ResponseBase.responseJsonHandler(dayOffs, res, 'Get user')
    }
    let doc = new GoogleSpreadsheet(spreadsheetId)
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    await sheet.clear('A2:Z')
    let createSheet = dayOffs.map((item) => {
      return {
        name: item?.user?.name,
        from: moment(item.logofffrom).format('YYYY-MM-DD'),
        to: moment(item.logoffto).format('YYYY-MM-DD'),
        reason: item.reason,
        quantity: item.quantity,
        contentlog: item.contentlog,
        status: item.status,
      }
    })
    await sheet.addRows(createSheet)
    return ResponseBase.responseJsonHandler('', res, 'Get google sheet')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const googleSheetController = {
  getGoogleSheet,
}
