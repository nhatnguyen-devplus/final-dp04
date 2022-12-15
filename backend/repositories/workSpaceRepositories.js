import { WorkSpace } from '../schemas/workSpace'

const getList = () => WorkSpace.find({})

export const workSpaceRepositories = {
  getList,
}
