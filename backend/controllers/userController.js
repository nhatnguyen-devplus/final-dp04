import { jwtService } from '../generals/jwt'
import { errors } from '../constants'
import { User } from '../schemas/users'
import { Helper, ResponseBase } from '../generals'
import { userService } from '../services'
import { userValidation } from '../validations/userValidation'

const getOne = async (req, res) => {
  const token = req.headers.authorization
  if (token) {
    const decode = jwtService.decodeToken(token.split(' ')[1])
    const user = await userService.getOnePopulate(decode.data.id)
    return ResponseBase.responseJsonHandler(user, res, 'Get user')
  }

  return res.status(401).json(errors.INVALID_TOKEN)
}

const getUser = async (req, res) => {
  const userId = req.params._id
  try {
    try {
      const user = await userService.getOnePopulate(userId)

      if (!user) return res.status(404).json(errors.NOT_FOUND)
      return ResponseBase.responseJsonHandler(user, res, 'Get user')
    } catch (error) {
      return Helper.responseJsonHandler(error.message, 404, res)
    }
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const getList = async (req, res) => {
  try {
    const listUsers = await userService.getListPopulate()

    return ResponseBase.responseJsonHandler(listUsers, res, 'Get list users')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params._id
    const user = await userService.getOne(userId)

    if (!user) return res.status(404).json(errors.NOT_FOUND)

    await userService.deleteUser(userId)

    return ResponseBase.responseJsonHandler(user, res, 'Delete user')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const updateUser = async (req, res) => {
  const userId = req.params._id
  const token = req.headers.authorization
  const userUpdateReq = req.body

  try {
    const user = await userService.getOne(userId)

    if (!user) return res.status(404).json(errors.NOT_FOUND)
  } catch (error) {
    return res.status(404).json(errors.NOT_FOUND)
  }

  try {
    await userValidation.checkUpdateReq.validateAsync(userUpdateReq)
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.details[0].message,
    })
  }

  try {
    if (token) {
      const decode = jwtService.decodeToken(token.split(' ')[1])

      if (decode.data.id === userId) {
        const updatedUser = await userService.updateUser(userId, userUpdateReq)

        return ResponseBase.responseJsonHandler(updatedUser, res, 'Update User')
      } else {
        return res.status(403).json(errors.FORBIDDEN)
      }
    }
    return res.status(401).json(errors.INVALID_TOKEN)
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const userController = {
  getOne,
  getUser,
  getList,
  deleteUser,
  updateUser,
}
