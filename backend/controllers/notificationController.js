import { errors } from '../constants'
import { Helper, ResponseBase } from '../generals'
import { jwtService } from '../generals/jwt'
import { userService } from '../services'
import { notificationService } from '../services/notificationservice'

const update = async (req, res) => {
  const notiId = req.params._id
  const token = req.headers.authorization

  const decode = jwtService.decodeToken(token.split(' ')[1])

  try {
    try {
      const user = await userService.getOne(decode.data.id)

      if (!user) return res.json(errors.NOT_FOUND)
      const noti = await notificationService.getOne(notiId)
      if (!noti) return res.json(errors.NOT_FOUND)
      if (user._id.toString() !== noti.to.toString()) return res.json(errors.FORBIDDEN)

      const newNoti = await notificationService.update(notiId)

      return ResponseBase.responseJsonHandler(newNoti, res, 'Update Notification')
    } catch {
      return res.json(errors.NOT_FOUND)
    }
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const getByUser = async (req, res) => {
  const token = req.headers.authorization
  const decode = jwtService.decodeToken(token.split(' ')[1])
  try {
    const user = await userService.getOne(decode.data.id)

    if (!user) return res.json(errors.NOT_FOUND)

    const notification = await notificationService.getByUser(decode.data.id)

    return ResponseBase.responseJsonHandler(notification, res, 'Get Notification')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const notificationController = {
  update,
  getByUser,
}
