import { RequestLogOff } from '../schemas/requestLogOff'

const create = (logOffCreateReq) => RequestLogOff.create(logOffCreateReq)

const getListRequests = (totalUser) =>
  RequestLogOff.find({ user: { $in: totalUser }, status: { $in: ['Pending', 'Change Request'] } }).populate([
    'masters',
    'user',
  ])

const getListDayOffs = (totalUser) =>
  RequestLogOff.find({ user: { $in: totalUser }, status: { $in: ['Reject', 'Approve', 'Cancel'] } }).populate([
    'masters',
    'user',
  ])

const getListByDay = (from, to) =>
  RequestLogOff.find({ logofffrom: { $gte: from }, logofffrom: { $lte: to } }).populate('user')

const getOne = (logOffId) => RequestLogOff.findById(logOffId).populate('user')

const addApproval = async (logOffId, userId) =>
  await RequestLogOff.updateOne({ _id: logOffId }, { $addToSet: { approval: userId } })

const update = (logOffId, logOffUpdateReq) => RequestLogOff.findByIdAndUpdate(logOffId, logOffUpdateReq)

export const logOffRepositories = {
  create,
  getListRequests,
  getOne,
  addApproval,
  update,
  getListDayOffs,
  getListByDay,
}
