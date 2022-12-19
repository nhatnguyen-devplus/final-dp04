import { workSpaceRepositories } from '../repositories'
import { NotificationRepositories } from '../repositories/notiRepositories'

const createMany = async (userFrom, userTo, description, logOffId) => {
  const workspace = await workSpaceRepositories.getList()
  const data = userTo.map((item) => {
    return {
      from: userFrom,
      to: item,
      description: description,
      logoff: logOffId,
      hrchanel: workspace.hrchanel || null,
      dayoffchanel: workspace.dayoffchanel || null,
    }
  })

  await NotificationRepositories.createMany(data)
}

const getOne = async (notiId) => await NotificationRepositories.getOne(notiId)

const update = async (notiId) => {
  const seen = {
    isSeen: true,
  }
  const a = await NotificationRepositories.update(notiId, seen)
  return a
}

const getByUser = async (userId) => await NotificationRepositories.getByUser(userId)

export const notificationService = {
  createMany,
  getOne,
  update,
  getByUser,
}
