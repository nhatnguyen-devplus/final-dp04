import { jwtService } from './jwt'

const { errors } = require('../constants')

export const CheckAuth = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    if (token) {
      const decode = jwtService.decodeToken(token.split(' ')[1])
      if (!decode) return res.status(401).json(errors.INVALID_TOKEN)
      return next()
    }
  } catch {
    return res.status(401).json(errors.INVALID_TOKEN)
  }

  return res.status(401).json(errors.INVALID_TOKEN)
}
