import { User } from '../schemas/users'

const getList = () => User.find({})

const getOne = (userId) => User.findById(userId)

const deleteUser = (userId) => User.findByIdAndDelete(userId)

const updateUser = (userId, userUpdateReq) => User.findByIdAndUpdate(userId, userUpdateReq)

const getByIds = (userIds) => User.find({ _id: { $in: userIds } })

export const userRepositories = {
  updateUser,
  deleteUser,
  getOne,
  getList,
  getByIds,
}
