import Api from '@app/config/httpRequest'

export const getAllSlackChannels = () => Api.get(`notification/slack/channels`)
export const getSlackChannelsDB = () => Api.get(`workspaces/`)
export const updateSlackChannels = (payload) => Api.post(`workspaces/${payload.id}`, payload.data)
