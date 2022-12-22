import {
  GET_ALL_SLACK_CHANNELS,
  GET_ALL_SLACK_CHANNELS_SUCCESS,
  GET_ALL_SLACK_CHANNELS_FAILURE,
  GET_SLACK_CHANNELS_DB,
  GET_SLACK_CHANNELS_DB_SUCCESS,
  GET_SLACK_CHANNELS_DB_FAILURE,
  UPDATE_SLACK_CHANNELS,
  UPDATE_SLACK_CHANNELS_SUCCESS,
  UPDATE_SLACK_CHANNELS_FAILURE,
} from './constant'

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

export const getSlackChannelsDB = () => ({
  type: GET_SLACK_CHANNELS_DB,
})

export const getSlackChannelsDBSuccess = (data) => ({
  type: GET_SLACK_CHANNELS_DB_SUCCESS,
  payload: data,
})

export const getSlackChannelsDBFailure = (error) => ({
  type: GET_SLACK_CHANNELS_DB_FAILURE,
  payload: error,
})

export const updateSlackChannels = (data) => ({
  type: UPDATE_SLACK_CHANNELS,
  payload: data,
})

export const updateSlackChannelsSuccess = (data) => ({
  type: UPDATE_SLACK_CHANNELS_SUCCESS,
  payload: data,
})

export const updateSlackChannelsFailure = (error) => ({
  type: UPDATE_SLACK_CHANNELS_FAILURE,
  payload: error,
})
