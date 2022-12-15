import { Notification } from '../schemas/notification'

const createMany = async (newNoties) => await Notification.insertMany(newNoties)

const getOne = async (notiId) => await Notification.findById(notiId)

const update = async (notiId, seen) => await Notification.findByIdAndUpdate(notiId, seen)
export const NotificationRepositories = {
  createMany,
  getOne,
  update,
}
