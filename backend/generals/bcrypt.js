import Bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config()

const hash = (password) => {
  return Bcrypt.hash(password, +process.env.SALT)
}

const hashSync = (password) => {
  return Bcrypt.hashSync(password, +process.env.SALT)
}

const compare = (password, hash) => {
  return Bcrypt.compare(password, hash)
}

const compareSync = (password, hash) => {
  return Bcrypt.compareSync(password, hash)
}

export const bcryptService = {
  hash,
  hashSync,
  compare,
  compareSync,
}
