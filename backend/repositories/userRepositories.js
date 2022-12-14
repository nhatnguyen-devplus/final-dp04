import mongoose from 'mongoose'
import { User } from '../schemas/users'

const getList = () => User.find({}).populate({ path: 'groupsId', select: 'name' })

const getOne = (userId) => User.findById(userId)

const getListPopulate = () => User.find({}).populate({ path: 'groupsId', select: 'name' })

const getOnePopulate = (userId) => User.findById(userId).populate({ path: 'groupsId', select: 'name' })

const deleteUser = (userId) => User.findByIdAndDelete(userId)

const updateUser = (userId, userUpdateReq) => User.findByIdAndUpdate(userId, userUpdateReq)

const getByIds = (userIds) => User.find({ _id: { $in: userIds } })

const addIdGroup = async (userIds, groupId) =>
  await User.updateMany({ _id: { $in: userIds } }, { $addToSet: { groupsId: groupId } })

const removeIdGroup = async (userIds, groupId) =>
  await User.updateMany({ _id: { $in: userIds } }, { $pull: { groupsId: groupId } })

export const userRepositories = {
  updateUser,
  deleteUser,
  getOne,
  getList,
  getByIds,
  addIdGroup,
  removeIdGroup,
  getOnePopulate,
  getListPopulate,
}
