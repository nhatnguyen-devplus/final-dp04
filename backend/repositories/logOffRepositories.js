import { RequestLogOff } from '../schemas/requestLogOff'

const create = (logOffCreateReq) => RequestLogOff.create(logOffCreateReq)

const getList = (totalUser) => RequestLogOff.find({ iduser: { $in: totalUser }, status: 'Pending' }).populate('masters')

export const logOffRepositories = {
  create,
  getList,
}
