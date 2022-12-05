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

const findByEmail = async (email) => {
  try {
    return await authRepositories.findByEmail(email)
  } catch (error) {
    throw error
  }
}

const createByGG = async (infoUser) => {
  try {
    const newUser = {
      email: infoUser.email,
      name: infoUser.name,
      avatar: infoUser.picture,
    }

    const createdUser = await authRepositories.register(newUser)
    return createdUser
  } catch (error) {
    throw error
  }
}

export const authService = {
  register,
  findByEmail,
  createByGG,
}
