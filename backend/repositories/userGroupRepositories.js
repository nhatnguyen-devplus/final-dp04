import { UserGroup } from '../schemas/userGroups'

const getList = (ids) => {
  if (ids.length === 0) return UserGroup.find({}).populate(['masters', 'staffs'])
  return UserGroup.find({ _id: { $in: ids } }).populate(['masters', 'staffs'])
}

const getOne = (userGroupId) => UserGroup.findById(userGroupId).populate(['masters', 'staffs'])

const getOneNoPopulate = (userGroupId) => UserGroup.findById(userGroupId)

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
  getOneNoPopulate,
}
