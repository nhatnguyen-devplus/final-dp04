import { workSpaceRepositories } from '../repositories'
import { NotificationRepositories } from '../repositories/notiRepositories'

const createMany = async (userFrom, userTo, description, logOffId) => {
  const workspace = await workSpaceRepositories.getList()
  const data = userTo.map((item) => {
    if (item.toString() !== userFrom.toString()) {
      return {
        from: userFrom,
        to: item,
        description: description,
        logoff: logOffId,
        hrchanel: workspace.hrchanel || null,
        dayoffchanel: workspace.dayoffchanel || null,
      }
    }
  })

  await NotificationRepositories.createMany(data)
}

const getOne = async (notiId) => await NotificationRepositories.getOne(notiId)

const update = async (notiId) => {
  const seen = {
    isSeen: true,
  }
  return await NotificationRepositories.update(notiId, seen)
}

const updateByRequest = async (requestId, userId) => await NotificationRepositories.updateByRequest(requestId, userId)

const getByUser = async (userId) => await NotificationRepositories.getByUser(userId)

export const notificationService = {
  createMany,
  getOne,
  update,
  getByUser,
  updateByRequest,
}
