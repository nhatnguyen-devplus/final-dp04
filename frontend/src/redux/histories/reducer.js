import { GET_HISTORIES, GET_HISTORIES_SUCCESS, GET_HISTORIES_FAILURE } from './constant'

const INITIAL_STATE = {
  data: null,
  error: null,
  response: null,
}

const historiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HISTORIES:
      return {
        ...state,
        error: null,
        response: null,
        data: null,
      }

    case GET_HISTORIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case GET_HISTORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default historiesReducer
