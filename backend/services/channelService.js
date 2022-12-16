import { channelRepository, workSpaceRepositories } from '../repositories'

const createMany = async (hrchannelsReq, dayoffchannelReq) => {
  const channels = await channelRepository.getList()

  const dataHr = hrchannelsReq.map((channel) => {
    return {
      name: channel.name,
      slackId: channel.slackId,
    }
  })

  const dataDayoff = dayoffchannelReq.map((channel) => {
    return {
      name: channel.name,
      slackId: channel.slackId,
    }
  })
  const newHrChannels = await channelRepository.createMany(dataHr)
  const newDayoffChannels = await channelRepository.createMany(dataDayoff)
  const hrchannelIds = newHrChannels.map((channel) => {
    return channel._id
  })

  const dayoffchannelIds = newDayoffChannels.map((channel) => {
    return channel._id
  })

  return { hrchannelIds, dayoffchannelIds }
}

export const channelService = {
  createMany,
}
