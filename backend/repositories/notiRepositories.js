import { Notification } from '../schemas/notification'

const createMany = async (newNoties) => await Notification.insertMany(newNoties)

export const NotiRepositories = {
  createMany,
}
