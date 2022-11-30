import { authRepositories } from '../repositories/authRepositories'
import { bcryptService } from '../generals/bcrypt'

const register = async (userCreateReq) => {
  const newPassword = await bcryptService.hash(userCreateReq.password)
  const newIDStaff = 'DEVPLUS' + userCreateReq.phone
  const newUser = {
    name: userCreateReq.name,
    phone: userCreateReq.phone,
    email: userCreateReq.email,
    password: newPassword,
    IDstaff: newIDStaff,
  }
  try {
    const createdUser = await authRepositories.register(newUser)
    return createdUser
  } catch (error) {
    throw error
  }
}

export const authService = {
  register,
}
