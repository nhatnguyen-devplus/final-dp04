import { Role } from '../constants/enum'
import { errors } from '../constants'
import { jwtService } from './jwt'

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    try {
      const decoded = jwtService.decodeToken(token.split(' ')[1])
      if (decoded.data.role !== Role.ADMIN) {
        return res.json(errors.FORBIDDEN)
      }

      return next()
    } catch {
      return res.json(errors.UNAUTHORIZE)
    }
  }
  return res.json(errors.INVALID_TOKEN)
}
