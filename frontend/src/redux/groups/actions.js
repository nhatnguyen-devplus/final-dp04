import {
  GET_ALL_GROUPS,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_FAILURE,
  GET_GROUP_BY_ID,
  GET_GROUP_BY_ID_SUCCESS,
  GET_GROUP_BY_ID_FAILURE,
  POST_CREATE_GROUP,
  POST_CREATE_GROUP_SUCCESS,
  POST_CREATE_GROUP_FAILURE,
  UPDATE_GROUP,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAILURE,
  DELETE_GROUP,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
} from './constant'

export const getAllGroups = () => ({
  type: GET_ALL_GROUPS,
})

export const getAllGroupsSuccess = (profile) => ({
  type: GET_ALL_GROUPS_SUCCESS,
  payload: profile,
})

export const getAllGroupsFailure = (error) => ({
  type: GET_ALL_GROUPS_FAILURE,
  payload: error,
})

export const getGroupById = (_id) => ({
  type: GET_GROUP_BY_ID,
  payload: _id,
})

export const getGroupByIdSuccess = (profile) => ({
  type: GET_GROUP_BY_ID_SUCCESS,
  payload: profile,
})

export const getGroupByIdFailure = (error) => ({
  type: GET_GROUP_BY_ID_FAILURE,
  payload: error,
})

export const postCreateGroup = (data) => ({
  type: POST_CREATE_GROUP,
  payload: data,
})

export const postCreateGroupSuccess = (profile) => ({
  type: POST_CREATE_GROUP_SUCCESS,
  payload: profile,
})

export const postCreateGroupFailure = (error) => ({
  type: POST_CREATE_GROUP_FAILURE,
  payload: error,
})

export const updateGroup = (data) => ({
  type: UPDATE_GROUP,
  payload: data,
})

export const updateGroupSuccess = (profile) => ({
  type: UPDATE_GROUP_SUCCESS,
  payload: profile,
})

export const updateGroupFailure = (error) => ({
  type: UPDATE_GROUP_FAILURE,
  payload: error,
})

export const deleteGroup = (_id) => ({
  type: DELETE_GROUP,
  payload: _id,
})

export const deleteGroupSuccess = (profile) => ({
  type: DELETE_GROUP_SUCCESS,
  payload: profile,
})

export const deleteGroupFailure = (error) => ({
  type: DELETE_GROUP_FAILURE,
  payload: error,
})
