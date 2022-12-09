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

export const getUserLogin = (data) => ({
  type: GET_USER_LOGIN,
  payload: { data },
})

export const getUserLoginSuccess = (profile) => ({
  type: GET_USER_LOGIN_SUCCESS,
  payload: profile,
})

export const getUserLoginFailure = (error) => ({
  type: GET_USER_LOGIN_FAILURE,
  payload: error,
})

export const getUserLoginGoogle = (isTokenGG) => ({
  type: GET_USER_LOGIN_GOOGLE,
  payload: { isTokenGG },
})

export const getUserLoginGoogleSuccess = (profile) => ({
  type: GET_USER_LOGIN_GOOGLE_SUCCESS,
  payload: profile,
})

export const getUserLoginGoogleFailure = (error) => ({
  type: GET_USER_LOGIN_GOOGLE_FAILURE,
  payload: error,
})

export const getUserByToken = () => ({
  type: GET_USER_BY_TOKEN,
})

export const getUserByTokenSuccess = (profile) => ({
  type: GET_USER_BY_TOKEN_SUCCESS,
  payload: profile,
})

export const getUserByTokenFailure = (error) => ({
  type: GET_USER_BY_TOKEN_FAILURE,
  payload: error,
})

export const userLogOut = () => ({
  type: USER_LOG_OUT,
})
