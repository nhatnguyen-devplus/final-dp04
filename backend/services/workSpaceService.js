import { workSpaceRepositories } from '../repositories'

const update = async (workspaceId, workSpaceUpdateReq) =>
  await workSpaceRepositories.update(workspaceId, workSpaceUpdateReq)

const create = async (workSpaceCreateReq) => await workSpaceRepositories.create(workSpaceCreateReq)

const getOne = async (workSpaceId) => await workSpaceRepositories.getOne(workSpaceId)

const getList = async () => await workSpaceRepositories.getList()

export const workspaceService = {
  update,
  create,
  getOne,
  getList,
}
