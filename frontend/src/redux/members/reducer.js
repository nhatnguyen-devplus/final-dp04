import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from './constant'

const INITIAL_STATE = {
  data: [],
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

    default:
      return state
  }
}

export default membersReducer
