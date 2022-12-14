import {
  GET_ALL_REQUESTS,
  GET_ALL_REQUESTS_SUCCESS,
  GET_ALL_REQUESTS_FAILURE,
  GET_REQUEST_BY_ID,
  GET_REQUEST_BY_ID_SUCCESS,
  GET_REQUEST_BY_ID_FAILURE,
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILURE,
} from './constant'

export const getAllRequests = () => ({
  type: GET_ALL_REQUESTS,
})

export const getAllRequestsSuccess = (profile) => ({
  type: GET_ALL_REQUESTS_SUCCESS,
  payload: profile,
})

export const getAllRequestsFailure = (error) => ({
  type: GET_ALL_REQUESTS_FAILURE,
  payload: error,
})

export const getRequestById = (id) => ({
  type: GET_REQUEST_BY_ID,
  payload: id,
})

export const getRequestByIdSuccess = (profile) => ({
  type: GET_REQUEST_BY_ID_SUCCESS,
  payload: profile,
})

export const getRequestByIdFailure = (error) => ({
  type: GET_REQUEST_BY_ID_FAILURE,
  payload: error,
})

export const createRequest = (data) => ({
  type: CREATE_REQUEST,
  payload: data,
})

export const createRequestSuccess = (profile) => ({
  type: CREATE_REQUEST_SUCCESS,
  payload: profile,
})

export const createRequestFailure = (error) => ({
  type: CREATE_REQUEST_FAILURE,
  payload: error,
})
