import { GET_ALL_USERS, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE } from './constant'

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
})

export const getAllUsersSuccess = (profile) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: profile,
})

export const getAllUsersFailure = (error) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: error,
})
