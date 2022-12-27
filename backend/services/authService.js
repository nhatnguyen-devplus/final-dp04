import { authRepositories } from '../repositories/authRepositories'
import { bcryptService } from '../generals/bcrypt'
import { jwtService } from '../generals/jwt'
import { userRepositories } from '../repositories'
import { mailerService } from '../generals/nodeMailer'

const register = async (userCreateReq) => {
  const { password, email, name } = userCreateReq

  const newPassword = await bcryptService.hash(password)

  const newIDStaff = 'DEVPLUS' + userCreateReq.phone

  const newUser = {
    name: name,
    phone: userCreateReq.phone,
    email: email,
    password: newPassword,
    IDstaff: newIDStaff,
  }

  try {
    const createdUser = await authRepositories.register(newUser)

    mailerService.sendVerifyMail(email, name, password)

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

const login = async (user) => {
  try {
    const refreshToken = jwtService.generateToken({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN_EXPIRE)

    await authRepositories.updateToken(user._id, refreshToken)

    const newToken = {
      token: `${jwtService.generateToken({ id: user._id, role: user.role }, process.env.TOKEN_EXPIRE)}`,
      refreshToken,
    }

    return newToken
  } catch (error) {
    throw error
  }
}

const updateRefreshToken = async (userId, refreshToken) => {
  try {
    const newRefreshToken = await authRepositories.updateToken(userId, refreshToken)
    return newRefreshToken
  } catch (error) {
    throw error
  }
}

const updatePassword = async (userId, password) => {
  try {
    const newPassword = await bcryptService.hash(password)
    return await userRepositories.updateUser(userId, { password: newPassword, isVerified: true })
  } catch (error) {
    throw error
  }
}

export const authService = {
  register,
  findByEmail,
  createByGG,
  login,
  updateRefreshToken,
  updatePassword,
}
