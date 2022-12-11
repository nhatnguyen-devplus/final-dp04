import { History } from '../schemas/history'

const create = (historyCreateReq) => History.create(historyCreateReq)

export const historyRepositories = {
  create,
}
