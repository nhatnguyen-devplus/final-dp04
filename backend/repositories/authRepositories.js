import { User } from '../schemas/users'
const register = async (userCreateReq) => User.create(userCreateReq)

export const authRepositories = {
  register,
}
