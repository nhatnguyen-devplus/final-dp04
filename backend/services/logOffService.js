import { RequestSTT } from '../constants/enum'
import { logOffRepositories } from '../repositories'
import { userService } from './userService'

const create = async (requestLogOff, totalMaster, userId) => {
  try {
    const newLogOff = {
      iduser: userId,
      masters: totalMaster,
      approval: [],
      usergroups: requestLogOff.usergroups,
      logofffrom: requestLogOff.logofffrom,
      logoffto: requestLogOff.logoffto,
      reason: requestLogOff.reason,
      status: RequestSTT.PENDING,
    }
    return logOffRepositories.create(newLogOff)
  } catch (error) {
    throw error
  }
}

const getList = async (totalUser) => {
  try {
    const logOff = await logOffRepositories.getList(totalUser)

    return logOff
  } catch (error) {
    throw error
  }
}

export const logOffService = {
  create,
  getList,
}
