import { jwtService } from '../generals/jwt'
import { Helper, ResponseBase } from '../generals'
import { logOffService, historyService, userService, userGroupService } from '../services'

const create = async (req, res) => {
  const logOffCreateReq = req.body
  const token = req.headers.authorization
  const decode = jwtService.decodeToken(token.split(' ')[1])
  try {
    const user = await userService.getOne(decode.data.id)
    let totalMaster = []

    const groups = await userGroupService.getByIds(user.groupsId)

    groups.map(async (index) => {
      if (index.toString() !== user._id.toString()) {
        totalMaster.push(index.masters)
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

const getList = async (req, res) => {
  const token = req.headers.authorization

  try {
    const decode = jwtService.decodeToken(token.split(' ')[1])

    const user = await userService.getOne(decode.data.id)

    const groups = await userGroupService.getByIds(user.groupsId)

    const totalUser = checkDuplicate(groups, user._id)

    if (totalUser.length === 0) {
      totalUser.push(user._id.toString())
    }
    const listRequest = await logOffService.getList(totalUser)
    return ResponseBase.responseJsonHandler(listRequest, res, 'List request')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const logOffController = {
  create,
  getList,
}
