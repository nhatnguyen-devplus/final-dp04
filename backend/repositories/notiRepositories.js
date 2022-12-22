import { Notification } from '../schemas/notification'

const createMany = async (newNoties) => await Notification.insertMany(newNoties)

const getOne = (notiId) => Notification.findById(notiId)

const update = (notiId, seen) =>
  Notification.findByIdAndUpdate(notiId, seen).populate({
    path: 'logoff',
    select: ['_id', 'status'],
  })

const updateByRequest = async (requestId, userId) =>
  await Notification.findOneAndUpdate({ logoff: requestId, to: userId }, { isSeen: true })
const getByUser = (userId) =>
  Notification.find({ to: { $eq: userId }, isSeen: { $eq: false } }).populate([
    { path: 'from', select: 'name' },
    { path: 'to', select: 'name' },
  ])

export const NotificationRepositories = {
  createMany,
  getOne,
  update,
  getByUser,
  updateByRequest,
}
