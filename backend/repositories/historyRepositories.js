const { History } = require('../schemas/history')

const create = (historyCreateReq) => History.create(historyCreateReq)

export const historyRepositories = {
  create,
}
