import { RequestSTT, TypeHistory } from '../constants/enum'
import { historyRepositories, logOffRepositories } from '../repositories'

const create = async (requestLogOff, totalMaster, userId) => {
  try {
    const newLogOff = {
      user: userId,
      masters: totalMaster,
      approval: [],
      usergroups: requestLogOff.usergroups,
      logofffrom: requestLogOff.logofffrom,
      logoffto: requestLogOff.logoffto,
      reason: requestLogOff.reason,
      status: RequestSTT.PENDING,
      quantity: requestLogOff.quantity,
      contentlog: requestLogOff.contentlog,
    }
    return logOffRepositories.create(newLogOff)
  } catch (error) {
    throw error
  }
}

const getListRequests = async (totalUser) => {
  try {
    const logOff = await logOffRepositories.getListRequests(totalUser)

    return logOff
  } catch (error) {
    throw error
  }
}

const getOne = async (logOffId) => await logOffRepositories.getOne(logOffId)

const update = async (logOffId, userId, logoffUpdateReq) => {
  const logOff = await logOffRepositories.getOne(logOffId)
  let newHistory = {
    idlogoff: logOff._id,
    user: userId,
    masters: logOff.masters,
    approval: logOff.approval,
    logofffrom: logOff.logofffrom,
    logoffto: logOff.logoffto,
    quantity: logOff.quantity,
    reason: null,
    typelog: null,
  }
  let changeSTT

  if (logoffUpdateReq.status === RequestSTT.APPROVE) {
    newHistory.typelog = TypeHistory.APPROVE
    newHistory.approval.push(userId)
    await logOffRepositories.addApproval(logOffId, userId)
    const newLogOff = await logOffRepositories.getOne(logOffId)

    if (newLogOff.approval.length === newLogOff.masters.length) {
      changeSTT = {
        status: RequestSTT.APPROVE,
        user: userId,
      }
    }
  }

  if (logoffUpdateReq.status === RequestSTT.REJECT) {
    newHistory.typelog = TypeHistory.REJECT
    newHistory.reason = logoffUpdateReq.reason

    changeSTT = {
      status: RequestSTT.REJECT,
    }
  }

  if (logoffUpdateReq.status === RequestSTT.CHANGE_REQUEST) {
    newHistory.typelog = TypeHistory.CHANGE_REQUEST
    newHistory.reason = logoffUpdateReq.reason

    changeSTT = {
      status: RequestSTT.CHANGE_REQUEST,
      approval: [],
    }
  }

  if (logoffUpdateReq.status === RequestSTT.CANCLE) {
    newHistory.typelog = TypeHistory.CANCLE

    changeSTT = {
      status: RequestSTT.CANCLE,
    }
  }

  if (logoffUpdateReq.status === RequestSTT.UPDATE) {
    newHistory.typelog = TypeHistory.UPDATE
    newHistory.logofffrom = logoffUpdateReq.logofffrom
    newHistory.logoffto = logoffUpdateReq.logoffto
    newHistory.quantity = logoffUpdateReq.quantity
    newHistory.approval = []

    changeSTT = {
      status: RequestSTT.PENDING,
      approval: [],
    }
  }

  await historyRepositories.create(newHistory)
  await logOffRepositories.update(logOffId, changeSTT)
  return newHistory
}

export const logOffService = {
  create,
  getListRequests,
  update,
  getOne,
}
