import { errors } from '../constants'
import { jwtService } from './jwt'

export const CheckAuth = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    if (token) {
      const decode = jwtService.decodeToken(token.split(' ')[1])
      
      if (!decode) return res.status(200).json(errors.INVALID_TOKEN)

      return next()
    }

    return res.status(200).json(errors.INVALID_TOKEN)
  } catch (error) {
    return res.status(200).json(errors.INVALID_TOKEN)
  }
}
