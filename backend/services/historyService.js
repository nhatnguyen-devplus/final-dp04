import { TypeHistory } from '../constants/enum'
import { slack } from '../generals/slack'
import { historyRepositories } from '../repositories'

const create = async (newHistory) => {
  try {
    let createHistory = {
      typelog: null,
      idlogoff: newHistory._id,
      approval: newHistory.approval,
      user: newHistory.user,
      masters: newHistory.masters,
      logofffrom: newHistory.logofffrom,
      logoffto: newHistory.logoffto,
      reason: newHistory.reason,
      quantity: newHistory.quantity,
      contentlog: newHistory.contentlog,
    }
    if (!newHistory.typelog) {
      createHistory.typelog = TypeHistory.CREATE
    } else {
      createHistory.typelog = newHistory.typelog
    }

    const createdHistory = await historyRepositories.create(createHistory)
    await slack.sendNotiLogOff(createdHistory)
  } catch (error) {
    throw error
  }
}

const getByRequest = async (logoffId) => await historyRepositories.getByRequest(logoffId)

export const historyService = {
  create,
  getByRequest,
}
