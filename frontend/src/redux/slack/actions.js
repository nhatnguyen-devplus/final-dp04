import { GET_ALL_SLACK_CHANNELS, GET_ALL_SLACK_CHANNELS_SUCCESS, GET_ALL_SLACK_CHANNELS_FAILURE } from './constant'

export const getAllSlackChannels = () => ({
  type: GET_ALL_SLACK_CHANNELS,
})

export const getAllSlackChannelsSuccess = (data) => ({
  type: GET_ALL_SLACK_CHANNELS_SUCCESS,
  payload: data,
})

export const getAllSlackChannelsFailure = (error) => ({
  type: GET_ALL_SLACK_CHANNELS_FAILURE,
  payload: error,
})
