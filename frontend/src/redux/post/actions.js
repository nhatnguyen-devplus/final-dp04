import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  GET_LIST_POST_FAILURE,
  POST_LIST_POST,
  POST_LIST_POST_FAILURE,
  POST_LIST_POST_SUCCESS,
} from './constant'

export const getListPost = () => {
  return {
    type: GET_LIST_POST,
  }
}

export const getListPostSuccess = (profile) => {
  return {
    type: GET_LIST_POST_SUCCESS,
    payload: profile,
  }
}
export const getListPostFailure = (error) => {
  return {
    type: GET_LIST_POST_FAILURE,
    payload: error,
  }
}

export const postListPost = (id) => {
  return {
    type: POST_LIST_POST,
    payload: { id },
  }
}

export const postListPostSuccess = (profile) => {
  return {
    type: POST_LIST_POST_SUCCESS,
    payload: profile,
  }
}
export const postListPostFailure = (error) => {
  return {
    type: POST_LIST_POST_FAILURE,
    payload: error,
  }
}
