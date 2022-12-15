import { Helper, ResponseBase } from '../generals/index'
import { User } from '../schemas/users'
import { authService } from '../services/authService'
import { errors } from '../constants'
import { authValidation } from '../validations/authValidation'
import { jwtService } from '../generals/jwt'
import { OAuth2Client } from 'google-auth-library'
import { emailValidation } from '../validations'
import { bcryptService } from '../generals/bcrypt'

const client = new OAuth2Client(process.env.CLIENT_ID)
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
  try {
    const { email, password } = req.body
    if (!email || !password) return res.json(errors.ERROR_INPUT)

    const user = await User.findOne({ email: email })

    if (!user) return res.json(errors.INCORRECT_PASSWORD_OR_EMAIL)

    const correctPassword = await bcryptService.compare(password, user.password)

    if (!correctPassword) return res.json(errors.INCORRECT_PASSWORD_OR_EMAIL)

    const newToken = await authService.login(user)

    return ResponseBase.responseJsonHandler(newToken, res, 'Login')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const loginGG = async (req, res) => {
  const tokenID = req.headers.authorization
  if (!tokenID) return res.json(errors.INVALID_TOKEN)
  try {
    try {
      var ticket = await client.verifyIdToken({
        idToken: tokenID.split(' ')[1],
      })
    } catch (error) {
      return res.json(errors.INVALID_TOKEN)
    }

    const infoUser = ticket.getPayload()

    try {
      await emailValidation.checkEmail.validateAsync(infoUser)
    } catch (err) {
      return res.json({
        status: 400,
        message: err.details[0].message,
      })
    }

    let user = await authService.findByEmail(infoUser.email)

    if (!user) {
      user = await authService.createByGG(infoUser)
    }
    const refreshToken = jwtService.generateToken({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN_EXPIRE)

    await authService.updateRefreshToken(user._id, refreshToken)

    const newToken = {
      token: `${jwtService.generateToken({ id: user._id, role: user.role }, process.env.TOKEN_EXPIRE)}`,
      refreshToken,
    }

    return ResponseBase.responseJsonHandler(newToken, res, 'Login')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const authController = {
  register,
  login,
  loginGG,
}
