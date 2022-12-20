import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  SEEN_NOTIFICATIONS,
  SEEN_NOTIFICATIONS_SUCCESS,
  SEEN_NOTIFICATIONS_FAILURE,
} from './constant'

const INITIAL_STATE = {
  data: null,
  seen: null,
  error: null,
  response: null,
}

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS: {
      return {
        ...state,
        error: null,
        response: null,
        data: null,
      }
    }

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }

    case SEEN_NOTIFICATIONS: {
      return {
        ...state,
        error: null,
        response: null,
      }
    }

    case SEEN_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        response: action.payload,
      }

    case SEEN_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default notificationsReducer
