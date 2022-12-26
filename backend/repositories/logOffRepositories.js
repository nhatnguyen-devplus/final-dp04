import { RequestLogOff } from '../schemas/requestLogOff'

const create = (logOffCreateReq) => RequestLogOff.create(logOffCreateReq)

const getListRequests = (totalUser, reqDayFrom = null, reqDayTo = null, reqName = null) => {
  let queryList = {
    status: { $in: ['Pending', 'Change Request'] },
  }

  if (totalUser) {
    queryList = {
      ...queryList,
      user: { $in: totalUser },
    }
  }

  if (reqDayFrom) {
    queryList = {
      ...queryList,
      logofffrom: { $gte: reqDayFrom },
    }
  }

  if (reqDayTo) {
    queryList = {
      ...queryList,
      logofffrom: { ...queryList.logofffrom, $lte: reqDayTo },
    }
  }

  return RequestLogOff.find(queryList).populate(['masters', 'user'])
}

const getListDayOffs = (totalUser, reqDayFrom = null, reqDayTo = null) => {
  let queryList = {
    status: { $in: ['Reject', 'Approve', 'Cancel'] },
  }

  if (totalUser) {
    queryList = {
      ...queryList,
      user: { $in: totalUser },
    }
  }
  if (reqDayFrom) {
    queryList = {
      ...queryList,
      logofffrom: { $gte: reqDayFrom },
    }
  }

  if (reqDayTo) {
    queryList = {
      ...queryList,
      logofffrom: { ...queryList.logofffrom, $lte: reqDayTo },
    }
  }

  return RequestLogOff.find(queryList).populate(['masters', 'user'])
}

const getListByDay = (reqDayFrom = null, reqDayTo = null, status = null) => {
  let queryList = {}
  if (status === 'All') {
    queryList = {
      status: { $in: ['Reject', 'Approve', 'Cancel'] },
    }
  } else {
    queryList = {
      status: { $in: [status] },
    }
  }
  if (reqDayFrom) {
    queryList = {
      ...queryList,
      logofffrom: { $gte: reqDayFrom },
    }
  }

  if (reqDayTo) {
    queryList = {
      ...queryList,
      logofffrom: { ...queryList.logofffrom, $lte: reqDayTo },
    }
  }

  return RequestLogOff.find(queryList).populate('user')
}

const getOne = (logOffId) => RequestLogOff.findById(logOffId).populate('user')

const getByUserIds = (userIds) => RequestLogOff.find({ user: { $in: userIds } }).select(['masters', 'approval'])

const addApproval = (logOffId, userId) =>
  RequestLogOff.updateOne({ _id: logOffId }, { $addToSet: { approval: userId } })

const update = (logOffId, logOffUpdateReq) => RequestLogOff.findByIdAndUpdate(logOffId, logOffUpdateReq)

export const logOffRepositories = {
  create,
  getListRequests,
  getOne,
  addApproval,
  update,
  getListDayOffs,
  getListByDay,
  getByUserIds,
}
