import { UserGroup } from '../schemas/userGroups'

const getList = () => UserGroup.find({})

const getOne = (userGroupId) => UserGroup.findById(userGroupId)

const findByName = (userGroupName) => UserGroup.findOne({ name: userGroupName })

const create = (userGroupCreateReq) => UserGroup.create(userGroupCreateReq)

const deleteUserGroup = (userGroupId) => UserGroup.findByIdAndDelete(userGroupId)

const updateUserGroup = (userGroupId, userGroupUpdateReq) =>
  UserGroup.findByIdAndUpdate(userGroupId, userGroupUpdateReq)

const getByIds = (userGroupIds) => UserGroup.find({ _id: { $in: userGroupIds } })

export const userGroupRepositories = {
  updateUserGroup,
  deleteUserGroup,
  getOne,
  getList,
  findByName,
  create,
  getByIds,
}
