import { TypeHistory } from '../constants/enum'
import { historyRepositories } from '../repositories'

const create = async (newHistory) => {
  try {
    const createHistory = {
      typelog: TypeHistory.CREATE,
      idlogoff: newHistory._id,
      iduser: newHistory.iduser,
      masters: newHistory.masters,
      logofffrom: newHistory.logofffrom,
      logoffto: newHistory.logoffto,
      reason: newHistory.reason,
    }

    await historyRepositories.create(createHistory)
  } catch (error) {
    throw error
  }
}

export const historyService = {
  create,
}
