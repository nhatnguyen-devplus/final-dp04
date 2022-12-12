import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  GET_ME,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
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

export const createUser = (data) => ({
  type: CREATE_USER,
  payload: data,
})

export const createUserSuccess = (profile) => ({
  type: CREATE_USER_SUCCESS,
  payload: profile,
})

export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
})

export const deleteUser = (data) => ({
  type: DELETE_USER,
  payload: data,
})

export const deleteUserSuccess = (response) => ({
  type: DELETE_USER_SUCCESS,
  payload: response,
})

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
})

export const getMe = () => ({
  type: GET_ME,
})

export const getMeSuccess = (profile) => ({
  type: GET_ME_SUCCESS,
  payload: profile,
})

export const getMeFailure = (error) => ({
  type: GET_ME_FAILURE,
  payload: error,
})

export const updateUser = (data) => ({
  type: UPDATE_USER,
  payload: data,
})

export const updateUserSuccess = (response) => ({
  type: UPDATE_USER_SUCCESS,
  payload: response,
})

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
})
