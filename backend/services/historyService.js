import { TypeHistory } from '../constants/enum'
import { historyRepositories } from '../repositories'

const create = async (newHistory, type = null) => {
  try {
    const createHistory = {
      typelog: TypeHistory.CREATE,
      idlogoff: newHistory._id,
      user: newHistory.user,
      masters: newHistory.masters,
      logofffrom: newHistory.logofffrom,
      logoffto: newHistory.logoffto,
      reason: newHistory.reason,
      quantity: newHistory.quantity,
      contentlog: newHistory.contentlog,
    }

    await historyRepositories.create(createHistory)
  } catch (error) {
    throw error
  }
}

export const historyService = {
  create,
}
