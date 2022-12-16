import { Channel } from '../schemas/channel'

const createMany = (newChannels) => Channel.insertMany(newChannels)

const getList = () => Channel.find({})

export const channelRepository = {
  createMany,
  getList,
}
