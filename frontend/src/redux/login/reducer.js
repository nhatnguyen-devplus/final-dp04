import {
  GET_USER_LOGIN,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_USER_BY_TOKEN,
  GET_USER_BY_TOKEN_SUCCESS,
  GET_USER_BY_TOKEN_FAILURE,
} from './constant'

const INITIAL_STATE = {
  data: [],
  loading: true,
  isLoggedIn: false,
  idToken: null,
}

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_LOGIN: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        idToken: localStorage.getItem('token'),
      }

    case GET_USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_USER_BY_TOKEN: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_USER_BY_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      }

    case GET_USER_BY_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default loginReducer
