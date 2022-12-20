import { Notification } from '../schemas/notification'

const createMany = async (newNoties) => {
  const a = await Notification.insertMany(newNoties)
  return a
}

const getOne = (notiId) => Notification.findById(notiId)

const update = (notiId, seen) => Notification.findByIdAndUpdate(notiId, seen)

const getByUser = (userId) =>
  Notification.find({ to: { $eq: userId }, isSeen: { $eq: false } }).populate([
    { path: 'from', select: 'name' },
    { path: 'to', select: 'name' },
    { path: 'logoff', select: '_id' },
  ])

export const NotificationRepositories = {
  createMany,
  getOne,
  update,
  getByUser,
}
