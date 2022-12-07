import { errors } from '../constants'
import { Helper, ResponseBase } from '../generals'
import { userGroupService, userService } from '../services'
import { userGroupValidation } from '../validations'

const getOne = async (req, res) => {
  const userGroupId = req.params._id
  const userGroup = await userGroupService.getOne(userGroupId)
  if (!userGroup) {
    return res.status(404).json(errors.NOT_FOUND)
  }
  return ResponseBase.responseJsonHandler(userGroup, res, 'Get user group')
}

const getList = async (req, res) => {
  try {
    const listUserGroups = await userGroupService.getList()

    return ResponseBase.responseJsonHandler(listUserGroups, res, 'Get list users')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const createUserGroup = async (req, res) => {
  const userGroupCraeteReq = req.body

  try {
    await userGroupValidation.createUserGroup.validateAsync(userGroupCraeteReq)
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.details[0].message,
    })
  }

  try {
    const userGroup = await userGroupService.findByName(userGroupCraeteReq.name)
    if (userGroup) return res.status(404).json(errors.EXISTED_PHONE)

    try {
      for (let i = 0; i < userGroupCraeteReq.staffs.length; i += 1) {
        await userService.getOne(userGroupCraeteReq.staffs[i])
      }
    } catch (error) {
      return res.status(404).json(errors.NOT_FOUND)
    }

    const newUserGroup = await userGroupService.createUserGroup(userGroupCraeteReq)
    return ResponseBase.responseJsonHandler(newUserGroup, res, 'Create user group')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const userGroupController = {
  getList,
  getOne,
  createUserGroup,
}
