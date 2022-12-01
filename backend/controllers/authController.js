import { Helper, ResponseBase } from '../generals/index'
import { User } from '../schemas/users'
import { authService } from '../services/authService'
import { errors } from '../constants'
import { authValidation } from '../validations/authValidation'
import { bcryptService } from '../generals/bcrypt'
import { jwtService } from '../generals/jwt'

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

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })

  if (!user) return res.json(errors.NOT_FOUND)

  const correctPassword = await bcryptService.compare(password, user.password)

  if (!correctPassword) return res.json(errors.INCORRECT_PASSWORD)

  const refreshToken = jwtService.generateToken({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN_EXPIRE)

  await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken })

  const newToken = {
    token: `${jwtService.generateToken({ id: user._id, role: user.role }, process.env.TOKEN_EXPIRE)}`,
    refreshToken,
  }
  return ResponseBase.responseJsonHandler(newToken, res, 'Login')
}

export const authController = {
  register,
  login,
}
