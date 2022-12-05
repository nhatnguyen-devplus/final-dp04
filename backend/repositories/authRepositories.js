import { User } from '../schemas/users'

const register = async (userCreateReq) => User.create(userCreateReq)

const findByEmail = (email) => User.findOne({ email: email })

export const authRepositories = {
  register,
  findByEmail,
}
