import { History } from '../schemas/history'

const create = (historyCreateReq) => History.create(historyCreateReq)

const getByRequest = (logoffId) => History.find({ idlogoff: logoffId })

export const historyRepositories = {
  create,
  getByRequest,
}
