import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

const generateToken = (data, expiresIn) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn })
}

const decodeToken = (data) => {
  return jwt.verify(data, process.env.JWT_SECRET)
}

export const jwtService = {
  generateToken,
  decodeToken,
}
