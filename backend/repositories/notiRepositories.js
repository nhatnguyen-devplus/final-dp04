import { Notification } from '../schemas/notification'

const createMany = async (newNoties) => await Notification.insertMany(newNoties)

const getOne = (notiId) => Notification.findById(notiId)

const update = (notiId, seen) => Notification.findByIdAndUpdate(notiId, seen)

const updateByRequest = async (requestId, userId) =>
  Notification.findOneAndUpdate({ logoff: requestId, to: userId }, { isSeen: true })

const getByUser = (userId) =>
  Notification.find({ to: { $eq: userId }, isSeen: { $eq: false } }).populate([
    { path: 'from', select: 'name' },
    { path: 'to', select: 'name' },
    { path: 'logoff', select: ['_id', 'status'] },
  ])

export const NotificationRepositories = {
  createMany,
  getOne,
  update,
  getByUser,
  updateByRequest,
}
