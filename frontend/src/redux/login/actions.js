import {
  GET_USER_LOGIN,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_USER_BY_TOKEN,
  GET_USER_BY_TOKEN_SUCCESS,
  GET_USER_BY_TOKEN_FAILURE,
} from './constant'

export const getUserLogin = (data) => {
  return {
    type: GET_USER_LOGIN,
    payload: { data },
  }
}

export const getUserLoginSuccess = (profile) => {
  return {
    type: GET_USER_LOGIN_SUCCESS,
    payload: profile,
  }
}

export const getUserLoginFailure = (error) => {
  return {
    type: GET_USER_LOGIN_FAILURE,
    payload: error,
  }
}

export const getUserByToken = () => {
  return {
    type: GET_USER_BY_TOKEN,
  }
}

export const getUserByTokenSuccess = (profile) => {
  return {
    type: GET_USER_BY_TOKEN_SUCCESS,
    payload: profile,
  }
}

export const getUserByTokenFailure = (error) => {
  return {
    type: GET_USER_BY_TOKEN_FAILURE,
    payload: error,
  }
}
