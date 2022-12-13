import { userGroupRepositories } from '../repositories'
import { userService } from './userService'

const getOne = async (userGroupId) => {
  return await userGroupRepositories.getOne(userGroupId)
}

const getOneNoPopulate = async (userGroupId) => await userGroupRepositories.getOneNoPopulate(userGroupId)

const getList = async () => {
  return await userGroupRepositories.getList()
}

const findByName = async (userGroupName) => {
  return await userGroupRepositories.findByName(userGroupName)
}

const createUserGroup = async (name, newMasters, newStaffs, totalUser) => {
  try {
    const newUserGroup = {
      name: name,
      staffs: newStaffs,
      masters: newMasters,
    }
    const createdUserGroup = await userGroupRepositories.create(newUserGroup)
    await userService.addGroupId(totalUser, createdUserGroup._id)

    return createdUserGroup
  } catch (error) {
    throw error
  }
}

const deleteUserGroup = async (userGroupId) => {
  return await userGroupRepositories.deleteUserGroup(userGroupId)
}

const getByIds = async (userGroupIds) => {
  return await userGroupRepositories.getByIds(userGroupIds)
}

const updateUserGroup = async (userGroupId, totalUser, userInGroup, newStaffs, newMasters) => {
  try {
    const newUserGroup = {
      staffs: newStaffs,
      masters: newMasters,
    }
    await userGroupRepositories.updateUserGroup(userGroupId, newUserGroup)

    if (userInGroup[0] && userInGroup[0].length > 0) {
      await userService.updateGroupId(userInGroup, userGroupId)
    }
    if (totalUser[0] && totalUser[0].length > 0) {
      await userService.addGroupId(totalUser, userGroupId)
    }
    return newUserGroup
  } catch (error) {
    throw error
  }
}

export const userGroupService = {
  getOne,
  getList,
  findByName,
  createUserGroup,
  deleteUserGroup,
  getByIds,
  getOneNoPopulate,
  updateUserGroup,
}
