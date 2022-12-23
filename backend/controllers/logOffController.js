import { errors } from '../constants'
import { RequestSTT } from '../constants/enum'
import { jwtService } from '../generals/jwt'
import { logOffValidation } from '../validations'
import { Helper, ResponseBase } from '../generals'
import { logOffService, historyService, userService, userGroupService } from '../services'
import { notificationService } from '../services/notificationservice'

const create = async (req, res) => {
  const logOffCreateReq = req.body
  const token = req.headers.authorization
  const decode = jwtService.decodeToken(token.split(' ')[1])
  try {
    try {
      await logOffValidation.logOffReq.validateAsync(logOffCreateReq)
    } catch (err) {
      return res.json({
        status: 422,
        message: err.details[0].message,
      })
    }
    if (logOffCreateReq.logofffrom > logOffCreateReq.logoffto) return res.json(errors.ERROR_INPUT)

    checkDay(logOffCreateReq)
    const user = await userService.getOne(decode.data.id)

    if (user.groupsId.length < 1) return res.json(errors.INVALID_DATA)

    let totalMaster = []
    const groups = await userGroupService.getByIds(user.groupsId)

    groups.map(async (index) => {
      if (index.toString() !== user._id.toString()) {
        if (index.masters.length > 0) {
          totalMaster.push(index.masters)
        }
      }
    })

    totalMaster = Array.from(new Set(totalMaster.toString().split(',')))
    const newLogOff = await logOffService.create(logOffCreateReq, totalMaster, user._id)
    await historyService.create(newLogOff)
    return ResponseBase.responseJsonHandler(newLogOff, res, 'Create log off')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const checkDuplicate = (groups, userId) => {
  let totalUser = []
  groups.map((item) => {
    item.masters.map((index) => {
      if (index._id.toString() === userId.toString()) {
        const userInGroup = Array.from(
          new Set(item.masters.toString().split(',').concat(item.staffs.toString().split(',')))
        )
        totalUser.push(userInGroup)
        totalUser = Array.from(new Set(totalUser.toString().split(',')))
      }
    })
  })
  return totalUser
}

const checkDay = (data) => {
  const from = new Date(data.logofffrom)
  const to = new Date(data.logoffto)

  if (data.quantity > Math.ceil(to - from) / 86400000 + 1) return res.json(errors.ERROR_INPUT)
}

const getListRequests = async (req, res) => {
  const token = req.headers.authorization
  const reqDayFrom = req.query.dayfrom ? req.query.dayfrom : null
  const reqDayTo = req.query.dayto ? req.query.dayto : null

  try {
    const decode = jwtService.decodeToken(token.split(' ')[1])

    const user = await userService.getOne(decode.data.id)

    const groups = await userGroupService.getByIds(user.groupsId)

    const totalUser = checkDuplicate(groups, user._id)

    if (totalUser.length === 0) {
      totalUser.push(user._id.toString())
    }
    const listRequest = await logOffService.getListRequests(totalUser, reqDayFrom, reqDayTo)
    return ResponseBase.responseJsonHandler(listRequest, res, 'List request')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const getListDayOffs = async (req, res) => {
  const token = req.headers.authorization
  const reqDayFrom = req.query?.from
  const reqDayTo = req.query?.to
  try {
    const decode = jwtService.decodeToken(token.split(' ')[1])

    const user = await userService.getOne(decode.data.id)

    const groups = await userGroupService.getByIds(user.groupsId)

    const totalUser = checkDuplicate(groups, user._id)

    if (totalUser.length === 0) {
      totalUser.push(user._id.toString())
    }
    const listDayOffs = await logOffService.getListDayOffs(totalUser, reqDayFrom, reqDayTo)
    return ResponseBase.responseJsonHandler(listDayOffs, res, 'List request')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const getOne = async (req, res) => {
  const token = req.headers.authorization
  const logoffId = req.params._id

  const decode = jwtService.decodeToken(token.split(' ')[1])

  try {
    const user = await userService.getOne(decode.data.id)
    const logoff = await logOffService.getOne(logoffId)

    await notificationService.updateByRequest(logoffId, user._id)
    if (logoff.masters.includes(user._id) || logoff.user._id.toString() === user._id.toString()) {
      return ResponseBase.responseJsonHandler(logoff, res, 'Get logoff')
    }
    return res.json(errors.FORBIDDEN)
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const update = async (req, res) => {
  const logoffUpdateReq = req.body
  const logoffId = req.params._id
  const token = req.headers.authorization

  const decode = jwtService.decodeToken(token.split(' ')[1])
  try {
    const user = await userService.getOne(decode.data.id)
    await notificationService.updateByRequest(logoffId, user._id)
    let logoff
    try {
      logoff = await logOffService.getOne(logoffId)

      if (!logoff) return res.json(errors.NOT_FOUND)
    } catch (error) {
      return res.json(errors.NOT_FOUND)
    }
    if (!logoffUpdateReq.status) return res.json(errors.INVALID_DATA)
    //Cant update RequestSTT Cancel || Reject
    if (logoff.status === RequestSTT.CANCEL || logoff.status === RequestSTT.REJECT) return res.json(errors.INVALID_DATA)

    //Stt pending masters =>  Approve || Reject || CHANGE_REQUEST || CANCEL
    if (logoff.status === RequestSTT.PENDING) {
      // Reject || CHANGE_REQUEST need reason
      if (
        logoffUpdateReq.status !== RequestSTT.APPROVE &&
        logoffUpdateReq.status !== RequestSTT.REJECT &&
        logoffUpdateReq.status !== RequestSTT.CANCEL &&
        logoffUpdateReq.status !== RequestSTT.CHANGE_REQUEST &&
        logoffUpdateReq.status !== RequestSTT.UPDATE
      )
        return res.json(errors.INVALID_DATA)
      //Reject || Change Request need reason
      if (logoffUpdateReq.status === RequestSTT.REJECT || logoffUpdateReq.status === RequestSTT.CHANGE_REQUEST) {
        if (!logoffUpdateReq.comment) return res.json(errors.INVALID_DATA)
      }
      //Reject || Approve || CHANGE_REQUEST need isMaster
      if (
        logoffUpdateReq.status === RequestSTT.REJECT ||
        logoffUpdateReq.status === RequestSTT.CHANGE_REQUEST ||
        logoffUpdateReq.status === RequestSTT.APPROVE
      ) {
        if (!logoff.masters.includes(user._id)) return res.json(errors.FORBIDDEN)
        if (logoff.approval.includes(user._id)) return res.json(errors.INVALID_DATA)
      }

      //Cancel logoff(CheckAuth) and Approval = 0
      if (logoffUpdateReq.status === RequestSTT.CANCEL) {
        if (user._id.toString() !== logoff.user._id.toString()) return res.json(errors.FORBIDDEN)

        if (logoff.approval.length > 0) return res.json(errors.INVALID_DATA)
      }

      //Update logoff(CheckAuth)
      if (logoffUpdateReq.status === RequestSTT.UPDATE) {
        if (user._id.toString() !== logoff.user._id.toString()) return res.json(errors.FORBIDDEN)
        try {
          await logOffValidation.logOffReq.validateAsync(logoffUpdateReq)
          checkDay(logoffUpdateReq)
        } catch (err) {
          return res.json({
            status: 422,
            message: err.details[0].message,
          })
        }
      }
    }

    //User update change request(Cancel) && checkauth
    if (logoff.status === RequestSTT.CHANGE_REQUEST) {
      if (logoffUpdateReq.logofffrom > logoffUpdateReq.logoffto) return res.json(errors.INVALID_DATA)

      const from = new Date(logoffUpdateReq.logofffrom)
      const to = new Date(logoffUpdateReq.logoffto)

      if (logoffUpdateReq.quantity > Math.ceil(to - from) / 86400000 + 1) return res.json(errors.ERROR_INPUT)

      if (logoffUpdateReq.status !== RequestSTT.UPDATE && logoffUpdateReq.status !== RequestSTT.CANCEL)
        return res.json(errors.INVALID_DATA)

      if (user._id.toString() !== logoff.user._id.toString()) return res.json(errors.FORBIDDEN)

      if (logoffUpdateReq.status === RequestSTT.UPDATE) {
        try {
          await logOffValidation.logOffReq.validateAsync(logoffUpdateReq)
        } catch (err) {
          return res.json({
            status: 422,
            message: err.details[0].message,
          })
        }
      }
    }

    // Revert checkAuth, cancel logoff
    if (logoff.status === RequestSTT.APPROVE) {
      if (user._id.toString() !== logoff.user._id.toString()) return res.json(errors.FORBIDDEN)
      if (logoffUpdateReq.status !== RequestSTT.CANCEL) return res.json(errors.INVALID_DATA)
    }

    const newHistory = await logOffService.update(logoffId, user._id, logoffUpdateReq)

    return ResponseBase.responseJsonHandler(newHistory, res, 'Update logoff')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const logOffController = {
  create,
  getListRequests,
  update,
  getOne,
  getListDayOffs,
}
