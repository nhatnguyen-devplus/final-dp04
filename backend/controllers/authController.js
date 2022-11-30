import { Helper, ResponseBase } from '../generals/index'
import { User } from '../schemas/users'
import { authService } from '../services/authService'
import { errors } from '../constants'
import { authValidation } from '../validations/authValidation'

const register = async (req, res) => {
  const userCreateReq = req.body

  try {
    await authValidation.checkCreateReq.validateAsync(userCreateReq)
  } catch (err) {
    return res.json({
      status: 400,
      message: err.details[0].message,
    })
  }

  try {
    const checkPhone = await User.findOne({ phone: userCreateReq.phone })

    const checkEmail = await User.findOne({ email: userCreateReq.email })

    if (checkPhone) return res.json(errors.EXISTED_PHONE)

    if (checkEmail) return res.json(errors.EXISTED_EMAIL)

    const newUser = await authService.register(userCreateReq)

    return ResponseBase.responseJsonHandler(newUser, res, 'Register')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const authController = {
  register,
}
