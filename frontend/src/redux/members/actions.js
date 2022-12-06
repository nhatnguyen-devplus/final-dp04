import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from './constant'

export const getAllUsers = () => {
  return {
    type: GET_ALL_USERS,
  }
}

export const getAllUsersSuccess = (profile) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: profile,
  }
}

export const getAllUsersFailure = (error) => {
  return {
    type: GET_ALL_USERS_FAILURE,
    payload: error,
  }
}
