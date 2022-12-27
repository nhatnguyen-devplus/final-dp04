import { POST_NEW_PASSWORD, POST_NEW_PASSWORD_SUCCESS, POST_NEW_PASSWORD_FAILURE } from './constant'

export const postNewPassword = (data) => ({
  type: POST_NEW_PASSWORD,
  payload: data,
})

export const postNewPasswordSuccess = (profile) => ({
  type: POST_NEW_PASSWORD_SUCCESS,
  payload: profile,
})

export const postNewPasswordFailure = (error) => ({
  type: POST_NEW_PASSWORD_FAILURE,
  payload: error,
})
