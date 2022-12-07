import { User } from '../schemas/users'
const register = async (userCreateReq) => User.create(userCreateReq)

const findByEmail = (email) => User.findOne({ email: email })

const updateToken = (userId, refreshToken) => User.findByIdAndUpdate(userId, { refreshToken: refreshToken })
export const authRepositories = {
  register,
  findByEmail,
  updateToken,
}
