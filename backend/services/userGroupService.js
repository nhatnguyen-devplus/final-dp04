import { userGroupRepositories } from '../repositories'

const getOne = async (userGroupId) => {
  return await userGroupRepositories.getOne(userGroupId)
}

const getList = async () => {
  return await userGroupRepositories.getList()
}

const findByName = async (userGroupName) => {
  return await userGroupRepositories.findByName(userGroupName)
}

const createUserGroup = async (userGroupCreateReq) => {
  try {
    const newUserGroup = {
      name: userGroupCreateReq.name,
      staffs: userGroupCreateReq.staffs,
      masters: userGroupCreateReq.masters,
    }

    const createdUserGroup = await userGroupRepositories.create(newUserGroup)

    return createdUserGroup
  } catch (error) {
    throw error
  }
}

const deleteUserGroup = async (userGroupId) => {
  return await userGroupRepositories.deleteUserGroup(userGroupId)
}

export const userGroupService = {
  getOne,
  getList,
  findByName,
  createUserGroup,
  deleteUserGroup,
}
