import { GET_ALL_SLACK_CHANNELS, GET_ALL_SLACK_CHANNELS_SUCCESS, GET_ALL_SLACK_CHANNELS_FAILURE } from './constant'

const INITIAL_STATE = {
  dataAll: [],
  response: null,
  error: null,
  loading: true,
}

const slackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_SLACK_CHANNELS: {
      return {
        ...state,
        loading: true,
        error: null,
        response: null,
      }
    }

    case GET_ALL_SLACK_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataAll: action.payload.channels,
      }

    case GET_ALL_SLACK_CHANNELS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default slackReducer
