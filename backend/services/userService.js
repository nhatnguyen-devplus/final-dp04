import { userRepositories } from '../repositories'

const getOne = async (userId) => {
  return await userRepositories.getOne(userId)
}

const getList = async () => {
  return await userRepositories.getList()
}

const deleteUser = async (userId) => {
  return await userRepositories.deleteUser(userId)
}

const updateUser = async (userId, userUpdateReq) => {
  const updateUser = {
    name: userUpdateReq.name,
    phone: userUpdateReq.phone,
    email: userUpdateReq.email,
  }
  try {
    await userRepositories.updateUser(userId, updateUser)

    return updateUser
  } catch (error) {
    throw error
  }
}

const getByIds = async (userIds) => {
  return await userRepositories.getByIds(userIds)
}

export const userService = {
  updateUser,
  getOne,
  getList,
  deleteUser,
  getByIds,
}
