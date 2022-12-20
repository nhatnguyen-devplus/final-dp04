import { errors } from '../constants'
import { Role } from '../constants/enum'
import { jwtService } from '../generals/jwt'
import { historyService, logOffService, userService } from '../services'

const { Helper, ResponseBase } = require('../generals')

const getByRequest = async (req, res) => {
  const requestId = req.params._id
  const token = req.headers.authorization
  const decode = jwtService.decodeToken(token.split(' ')[1])
  try {
    const user = await userService.getOne(decode.data.id)
    if (!user) return res.json(errors.NOT_FOUND)

    const logOff = await logOffService.getOne(requestId)
    if (!logOff) return res.json(errors.NOT_FOUND)

    if (
      user._id.toString() !== logOff.user._id.toString() &&
      user.role !== Role.ADMIN &&
      logOff.masters.includes(user._id) !== true
    )
      return res.json(errors.FORBIDDEN)

    const history = await historyService.getByRequest(requestId)

    return ResponseBase.responseJsonHandler(history, res, 'Get request id')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const historyController = {
  getByRequest,
}
