import { RequestSTT, TypeHistory } from '../constants/enum'
import { logOffRepositories } from '../repositories'
import { historyService } from './historyService'
import { notificationService } from './notificationservice'

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
    if (newLogOff.contentlog === 'WFH') {
      newLogOff.quantity = 0
    }
    const descriptionNoti = ' created new request'
    const createdLogOff = await logOffRepositories.create(newLogOff)
    await notificationService.createMany(userId, totalMaster, descriptionNoti, createdLogOff._id)
    return createdLogOff
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

const getListDayOffs = async (totalUser) => {
  try {
    const dayOffs = await logOffRepositories.getListDayOffs(totalUser)

    return dayOffs
  } catch (error) {
    throw error
  }
}

const getListByDay = async (from, to) => {
  try {
    return await logOffRepositories.getListByDay(from, to)
  } catch (error) {
    throw error
  }
}
const getOne = async (logOffId) => await logOffRepositories.getOne(logOffId)

const update = async (logOffId, userId, logoffUpdateReq) => {
  const logOff = await logOffRepositories.getOne(logOffId)
  let newHistory = {
    _id: logOff._id,
    user: userId,
    masters: logOff.masters,
    approval: logOff.approval,
    logofffrom: logOff.logofffrom,
    logoffto: logOff.logoffto,
    quantity: logOff.quantity,
    reason: logOff.reason,
    typelog: null,
    comment: null,
    contentlog: logOff.contentlog,
  }
  let changeSTT
  let userTo = []
  let descriptionNoti

  if (logoffUpdateReq.status === RequestSTT.APPROVE) {
    newHistory.typelog = TypeHistory.APPROVE
    newHistory.comment = logoffUpdateReq.comment
    newHistory.approval.push(userId)
    await logOffRepositories.addApproval(logOffId, userId)

    const newLogOff = await logOffRepositories.getOne(logOffId)

    userTo.push(logOff.user._id)
    descriptionNoti = ' approved your request'

    if (newLogOff.approval.length === newLogOff.masters.length) {
      changeSTT = {
        status: RequestSTT.APPROVE,
      }
    }
  }

  if (logoffUpdateReq.status === RequestSTT.REJECT) {
    newHistory.typelog = TypeHistory.REJECT
    newHistory.comment = logoffUpdateReq.comment
    newHistory.user = userId
    userTo.push(logOff.user._id)
    descriptionNoti = ' rejected your request'

    changeSTT = {
      status: RequestSTT.REJECT,
    }
  }

  if (logoffUpdateReq.status === RequestSTT.CHANGE_REQUEST) {
    newHistory.typelog = TypeHistory.CHANGE_REQUEST
    newHistory.comment = logoffUpdateReq.comment
    userTo.push(logOff.user._id)
    descriptionNoti = ' requested change your log off'

    changeSTT = {
      status: RequestSTT.CHANGE_REQUEST,
      approval: [],
    }
  }

  if (logoffUpdateReq.status === RequestSTT.CANCEL) {
    newHistory.typelog = TypeHistory.CANCEL
    newHistory.comment = logoffUpdateReq.comment
    userTo.concat(newHistory.masters)
    descriptionNoti = ' cancel request'

    changeSTT = {
      status: RequestSTT.CANCEL,
    }
  }

  if (logoffUpdateReq.status === RequestSTT.UPDATE) {
    newHistory.typelog = TypeHistory.UPDATE
    newHistory.logofffrom = logoffUpdateReq.logofffrom
    newHistory.logoffto = logoffUpdateReq.logoffto
    newHistory.quantity = logoffUpdateReq.quantity
    newHistory.approval = []
    newHistory.reason = logoffUpdateReq.reason
    if (newHistory.contentlog === 'WFH') {
      newHistory.quantity = 0
    }
    userTo.concat(newHistory.masters)
    descriptionNoti = ' updated request'

    changeSTT = {
      status: RequestSTT.PENDING,
      logoffto: logoffUpdateReq.logoffto,
      logofffrom: logoffUpdateReq.logofffrom,
      quantity: logoffUpdateReq.quantity,
      reason: logoffUpdateReq.reason,
      approval: [],
    }
  }

  await historyService.create(newHistory)
  await notificationService.createMany(userId, userTo, descriptionNoti, logOffId)
  await logOffRepositories.update(logOffId, changeSTT)
  return newHistory
}

export const logOffService = {
  create,
  getListRequests,
  update,
  getOne,
  getListDayOffs,
  getListByDay,
}
