const { errors } = require('../constants')

export const CheckAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const decode = jwtService.decodeToken(token.split(' ')[1])
    if (!decode) res.status(401).json(errors.INVALID_TOKEN)
    return next()
  }

  return res.status(401).json(errors.INVALID_TOKEN)
}
