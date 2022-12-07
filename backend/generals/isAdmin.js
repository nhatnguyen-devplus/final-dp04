import { Role } from '../constants/enum'
import { errors } from '../constants'
import { jwtService } from './jwt'

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    try {
      const decoded = jwtService.decodeToken(token.split(' ')[1])

      if (!decoded) return res.status(200).json(errors.UNAUTHORIZE)

      if (decoded.data.role !== Role.ADMIN) return res.status(403).json(errors.FORBIDDEN)

      return next()
    } catch {
      return res.status(200).json(errors.UNAUTHORIZE)
    }
  }
  return res.status(200).json(errors.INVALID_TOKEN)
}
