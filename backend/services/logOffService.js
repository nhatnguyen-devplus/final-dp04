import { RequestSTT, TypeHistory } from '../constants/enum'
import { logOffRepositories, userGroupRepositories } from '../repositories'
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

    if (totalMaster.includes(userId.toString())) {
      newLogOff.approval.push(userId)
    }

    if (newLogOff.approval.length === newLogOff.masters.length) {
      newLogOff.status = RequestSTT.APPROVE
    }

    const descriptionNoti = ' created new request'
    const createdLogOff = await logOffRepositories.create(newLogOff)
    await notificationService.createMany(userId, totalMaster, descriptionNoti, createdLogOff._id)
    return createdLogOff
  } catch (error) {
    throw error
  }
}

const getListRequests = async (totalUser, reqDayFrom = null, reqDayTo = null) => {
  try {
    const logOff = await logOffRepositories.getListRequests(totalUser, reqDayFrom, reqDayTo)

    return logOff
  } catch (error) {
    throw error
  }
}

const getListDayOffs = async (totalUser, reqDayFrom = null, reqDayTo = null) => {
  try {
    const dayOffs = await logOffRepositories.getListDayOffs(totalUser, reqDayFrom, reqDayTo)
    return dayOffs
  } catch (error) {
    throw error
  }
}

const getListByDay = async (from, to, status) => {
  try {
    return await logOffRepositories.getListByDay(from, to, status)
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
    userTo = userTo.concat(newHistory.masters)
    descriptionNoti = ' canceled request'

    changeSTT = {
      status: RequestSTT.CANCEL,
      comment: logoffUpdateReq.comment,
    }
  }

  if (logoffUpdateReq.status === RequestSTT.UPDATE) {
    let newApproval = []
    if (newHistory.masters.includes(logOff.user._id.toString())) {
      newApproval.push(newHistory.user)
    }
    newHistory.typelog = TypeHistory.UPDATE
    newHistory.logofffrom = logoffUpdateReq.logofffrom
    newHistory.logoffto = logoffUpdateReq.logoffto
    newHistory.quantity = logoffUpdateReq.quantity
    newHistory.approval = newApproval
    newHistory.reason = logoffUpdateReq.reason
    if (newHistory.contentlog === 'WFH') {
      newHistory.quantity = 0
    }
    userTo = userTo.concat(newHistory.masters)

    descriptionNoti = ' updated request'

    changeSTT = {
      status: RequestSTT.PENDING,
      logoffto: logoffUpdateReq.logoffto,
      logofffrom: logoffUpdateReq.logofffrom,
      quantity: logoffUpdateReq.quantity,
      reason: logoffUpdateReq.reason,
      approval: newApproval,
    }
  }

  await historyService.create(newHistory)
  await notificationService.createMany(userId, userTo, descriptionNoti, logOffId)
  await logOffRepositories.update(logOffId, changeSTT)
  return newHistory
}

const syncLogOff = async (groupId, newMasters, mastersInGroup) => {
  try {
    let addMasters = []
    let removeMasters = []
    newMasters.forEach((newMaster) => {
      if (!mastersInGroup.includes(newMaster)) {
        addMasters = [...addMasters, newMaster]
      }
    })

    mastersInGroup.forEach((masterInGroup) => {
      if (!newMasters.includes(masterInGroup)) {
        removeMasters = [...removeMasters, masterInGroup]
      }
    })

    const group = await userGroupRepositories.getOneNoPopulate(groupId)

    const staffs = group.staffs.toString().split(',')
    const masters = group.masters.toString().split(',')
    const userIds = Array.from(new Set(staffs.concat(masters)))

    const requests = await logOffRepositories.getByUserIds(userIds)

    const newRequests = requests.map((request) => {
      removeMasters.forEach((removeMaster) => {
        if (!request.approval.includes(removeMaster)) {
          request.approval.push(removeMaster)
        }
      })
      addMasters.forEach((addMaster) => {
        if (!request.masters.includes(addMaster)) {
          request.masters.push(addMaster)
        }
      })
      return request
    })

    await Promise.all(
      newRequests.map(async (newRequest) => {
        let dataUpdate = {
          approval: newRequest.approval,
          masters: newRequest.masters,
        }
        if (newRequest.approval.length === newRequest.masters.length) {
          dataUpdate = {
            ...dataUpdate,
            status: RequestSTT.APPROVE,
          }
        }
        return await logOffRepositories.update(newRequest._id, dataUpdate)
      })
    )
  } catch (error) {
    throw error
  }
}

export const logOffService = {
  create,
  getListRequests,
  update,
  getOne,
  getListDayOffs,
  getListByDay,
  syncLogOff,
}
