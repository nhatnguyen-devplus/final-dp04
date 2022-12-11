import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
} from './constant'

const INITIAL_STATE = {
  data: [],
  dataById: [],
  loading: true,
}

const membersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_USER_BY_ID: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        dataById: action.payload,
      }

    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        dataById: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default membersReducer
