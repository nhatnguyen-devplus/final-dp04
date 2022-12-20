import { userRepositories } from '../repositories'

const getOne = async (userId) => {
  return await userRepositories.getOne(userId)
}

const getList = async () => {
  return await userRepositories.getList()
}

const getOnePopulate = async (userId) => {
  return await userRepositories.getOnePopulate(userId)
}

const getListPopulate = async () => {
  return await userRepositories.getListPopulate()
}

const deleteUser = async (userId) => {
  return await userRepositories.deleteUser(userId)
}

const updateUser = async (userId, userUpdateReq) => {
  const updateUser = {
    name: userUpdateReq.name,
    phone: userUpdateReq.phone,
    email: userUpdateReq.email,
    role: userUpdateReq.role,
  }
  try {
    await userRepositories.updateUser(userId, updateUser)

    return updateUser
  } catch (error) {
    throw error
  }
}

const getByIds = async (userIds) => await userRepositories.getByIds(userIds)

const addGroupId = async (userInGroup, groupId) => await userRepositories.addIdGroup(userInGroup, groupId)

const updateGroupId = async (usersRemoveGroup, groupId) =>
  await userRepositories.removeIdGroup(usersRemoveGroup, groupId)

export const userService = {
  updateUser,
  getOne,
  getList,
  deleteUser,
  getByIds,
  addGroupId,
  updateGroupId,
  getOnePopulate,
  getListPopulate,
}
