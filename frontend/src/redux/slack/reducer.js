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

const INITIAL_STATE = {
  dataAll: [],
  dataDB: null,
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

    case GET_SLACK_CHANNELS_DB: {
      return {
        ...state,
        loading: true,
        error: null,
        response: null,
        dataDB: null,
      }
    }

    case GET_SLACK_CHANNELS_DB_SUCCESS:
      return {
        ...state,
        loading: false,
        dataDB: action.payload,
      }

    case GET_SLACK_CHANNELS_DB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case UPDATE_SLACK_CHANNELS: {
      return {
        ...state,
        loading: true,
        error: null,
        response: null,
      }
    }

    case UPDATE_SLACK_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case UPDATE_SLACK_CHANNELS_FAILURE:
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
