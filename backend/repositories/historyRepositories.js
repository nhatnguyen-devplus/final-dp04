import { History } from '../schemas/history'

const create = (historyCreateReq) => History.create(historyCreateReq)

const getByRequest = (logoffId) =>
  History.find({ idlogoff: logoffId }).populate([
    { path: 'user', select: 'name' },
    { path: 'idlogoff', select: 'reason' },
  ])

export const historyRepositories = {
  create,
  getByRequest,
}
