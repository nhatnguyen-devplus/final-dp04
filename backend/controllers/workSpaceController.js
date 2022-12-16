import { errors } from '../constants'
import { Helper, ResponseBase } from '../generals'
import { channelService, workspaceService } from '../services'
import { workSpaceValidation } from '../validations'

const create = async (req, res) => {
  const workSpcaeCreateReq = req.body
  try {
    await workSpaceValidation.workSpaceReq.validateAsync(workSpcaeCreateReq)
  } catch (error) {
    return res.json({
      status: 422,
      message: error.details[0].message,
    })
  }
  try {
    const data = await channelService.createMany(workSpcaeCreateReq.hrchannel, workSpcaeCreateReq.dayoffchannel)
    const newWorkSpace = {
      name: workSpcaeCreateReq.name,
      hrchannel: data.hrchannelIds,
      dayoffchannel: data.dayoffchannelIds,
    }
    const workSpace = await workspaceService.create(newWorkSpace)

    return ResponseBase.responseJsonHandler(workSpace, res, 'Create work space')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const getOne = async (req, res) => {
  const workSpaceId = req.params._id

  try {
    const workSpace = await workspaceService.getOne(workSpaceId)

    if (!workSpace) return res.json(errors.NOT_FOUND)

    return ResponseBase.responseJsonHandler(workSpace, res, 'Get workspace')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const update = async (req, res) => {
  const workSpaceId = req.params._id
  const workSpaceUpdateReq = req.body
  try {
    await workSpaceValidation.workSpaceReq.validateAsync(workSpaceUpdateReq)
  } catch (error) {
    return res.json({
      status: 422,
      message: error.details[0].message,
    })
  }
  try {
    const workSpace = await workspaceService.getOne(workSpaceId)

    if (!workSpace) return res.json(errors.NOT_FOUND)

    const data = await channelService.createMany(workSpaceUpdateReq.hrchannel, workSpaceUpdateReq.dayoffchannel)

    const newWorkSpace = {
      name: workSpaceUpdateReq.name,
      hrchannel: data.hrchannelIds,
      dayoffchannel: data.dayoffchannelIds,
    }

    await workspaceService.update(workSpaceId, newWorkSpace)
    return ResponseBase.responseJsonHandler(newWorkSpace, res, 'Update workspace')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

const getList = async (req, res) => {
  try {
    const workspaces = await workspaceService.getList()

    return ResponseBase.responseJsonHandler(workspaces, res, 'Get list workspaces')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const workSpaceController = {
  create,
  getOne,
  update,
  getList,
}
