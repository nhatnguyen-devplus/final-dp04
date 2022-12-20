import { errors } from '../constants'
import { Role } from '../constants/enum'
import { Helper, ResponseBase } from '../generals'
import { jwtService } from '../generals/jwt'
import { userGroupService, userService } from '../services'
import { userGroupValidation } from '../validations'

const getOne = async (req, res) => {
  const userGroupId = req.params._id
  try {
    const userGroup = await userGroupService.getOne(userGroupId)
    if (!userGroup) {
      return res.status(404).json(errors.NOT_FOUND)
    }

    return ResponseBase.responseJsonHandler(userGroup, res, 'Get user group')
  } catch (error) {
    return Helper.responseJsonHandler(error.message, 404, res)
  }
}

const getList = async (req, res) => {
  const token = req.headers.authorization
  const decode = jwtService.decodeToken(token.split(' ')[1])
  try {
    const user = await userService.getOne(decode.data.id)
    let groups = []
    if (user.role !== Role.ADMIN) {
      groups = user.groupsId
    }
    const listUserGroups = await userGroupService.getList(groups)

    return ResponseBase.responseJsonHandler(listUserGroups, res, 'Get list users')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const createUserGroup = async (req, res) => {
  const { name, staffs, masters } = req.body
  const newStaffs = Array.from(new Set(staffs))
  const newMasters = Array.from(new Set(masters))
  const totalUser = Array.from(new Set(newMasters.concat(newStaffs)))
  try {
    try {
      await userService.getByIds(totalUser)
    } catch {
      return res.status(404).json(errors.NOT_FOUND)
    }
    await userGroupValidation.createUserGroup.validateAsync(req.body)
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.details[0].message,
    })
  }

  try {
    const userGroup = await userGroupService.findByName(name)
    if (userGroup) return res.status(422).json(errors.EXISTED_GROUP)

    const newUserGroup = await userGroupService.createUserGroup(name, newMasters, newStaffs, totalUser)
    return ResponseBase.responseJsonHandler(newUserGroup, res, 'Create user group')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const deleteUserGroup = async (req, res) => {
  try {
    const userGroupId = req.params._id

    const userGroup = await userGroupService.getOne(userGroupId)

    if (!userGroup) return res.status(404).json(errors.NOT_FOUND)

    const dataStaffs = userGroup.staffs.map((staff) => {
      return staff._id
    })

    const dataMasters = userGroup.masters.map((master) => {
      return master._id
    })
    const userRemoveGroup = Array.from(
      new Set(dataMasters.toString('').split(',').concat(dataStaffs.toString('').split(',')))
    )
    await userService.updateGroupId(userRemoveGroup, userGroupId)
    await userGroupService.deleteUserGroup(userGroupId)

    return ResponseBase.responseJsonHandler(userGroup, res, 'Delete user group')
  } catch (error) {
    return Helper.responseJsonHandler(error.message, 404, res)
  }
}

const updateUserGroup = async (req, res) => {
  const userGroupId = req.params._id
  const { masters, staffs } = req.body

  if ((masters && masters.length === 0) || (staffs && staffs.length === 0) || !masters || !staffs) {
    return res.status(422).json(errors.INVALID_DATA)
  }

  const newStaffs = Array.from(new Set(staffs))
  const newMasters = Array.from(new Set(masters))
  const totalUser = Array.from(new Set(newMasters.concat(newStaffs)))

  let userGroup = []
  try {
    userGroup = await userGroupService.getOneNoPopulate(userGroupId)
  } catch (error) {
    return res.status(404).json(errors.NOT_FOUND)
  }

  if (!userGroup) res.status(404).json(errors.NOT_FOUND)
  try {
    try {
      await userService.getByIds(totalUser)
    } catch {
      return res.status(404).json(errors.NOT_FOUND)
    }

    const mastersInGroup = userGroup.masters.toString().split(',')
    const staffsInGroup = userGroup.staffs.toString().split(',')

    const userInGroup = Array.from(new Set(staffsInGroup.concat(mastersInGroup)))
    for (let i = 0; i < totalUser.length; i += 1) {
      for (let j = 0; j < userInGroup.length; j += 1) {
        if (totalUser[i] === userInGroup[j]) {
          totalUser.splice(i, 1)
          userInGroup.splice(j, 1)
          i -= 1
          break
        }
      }
    }

    const updatedUserGroup = await userGroupService.updateUserGroup(
      userGroup.id,
      totalUser,
      userInGroup,
      newStaffs,
      newMasters
    )
    return ResponseBase.responseJsonHandler(updatedUserGroup, res, 'Update group')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const userGroupController = {
  getList,
  getOne,
  createUserGroup,
  deleteUserGroup,
  updateUserGroup,
}
