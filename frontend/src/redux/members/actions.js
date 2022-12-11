import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
} from './constant'

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

export const getUserById = (_id) => ({
  type: GET_USER_BY_ID,
  payload: _id,
})

export const getUserByIdSuccess = (profile) => ({
  type: GET_USER_BY_ID_SUCCESS,
  payload: profile,
})

export const getUserByIdFailure = (error) => ({
  type: GET_USER_BY_ID_FAILURE,
  payload: error,
})
