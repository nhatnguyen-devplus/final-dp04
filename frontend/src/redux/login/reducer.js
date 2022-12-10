import {
  GET_USER_LOGIN,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_USER_LOGIN_GOOGLE,
  GET_USER_LOGIN_GOOGLE_SUCCESS,
  GET_USER_LOGIN_GOOGLE_FAILURE,
  GET_USER_BY_TOKEN,
  GET_USER_BY_TOKEN_SUCCESS,
  GET_USER_BY_TOKEN_FAILURE,
  USER_LOG_OUT,
} from './constant'

const INITIAL_STATE = {
  data: [],
  role: null,
  loading: true,
  isLoggedIn: false,
  idToken: null,
  error: null,
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
        idToken: localStorage.getItem('token') || '',
      }

    case GET_USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_USER_LOGIN_GOOGLE: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_USER_LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        idToken: localStorage.getItem('token') || '',
      }

    case GET_USER_LOGIN_GOOGLE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case GET_USER_BY_TOKEN: {
      return {
        ...state,
        loading: true,
        role: null,
      }
    }

    case GET_USER_BY_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        role: action.payload.data.role,
        isLoggedIn: true,
        idToken: localStorage.getItem('token') || '',
      }

    case GET_USER_BY_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoggedIn: false,
      }

    case USER_LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      }
    }
    default:
      return state
  }
}

export default loginReducer
