import { WorkSpace } from '../schemas/workSpace'

const getList = () => WorkSpace.find({}).populate(['hrchannel', 'dayoffchannel'])

const create = (newWorkSpace) => WorkSpace.create(newWorkSpace)

const getOne = (workSpaceId) =>
  WorkSpace.findById(workSpaceId).populate([
    { path: 'hrchannel', select: ['name', 'slackid'] },
    { path: 'dayoffchannel', select: ['name', 'slackid'] },
  ])

const update = (workSpaceId, workSpaceUpdateReq) => WorkSpace.findByIdAndUpdate(workSpaceId, workSpaceUpdateReq)
export const workSpaceRepositories = {
  getList,
  create,
  getOne,
  update,
}
