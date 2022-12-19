import Api from '@app/config/httpRequest'

export const getAllSlackChannels = () => Api.get(`notification/slack/channels`)
