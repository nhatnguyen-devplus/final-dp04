import { GET_HISTORIES, GET_HISTORIES_SUCCESS, GET_HISTORIES_FAILURE } from './constant'

export const getHistories = (data) => ({
  type: GET_HISTORIES,
  payload: data,
})

export const getHistoriesSuccess = (data) => ({
  type: GET_HISTORIES_SUCCESS,
  payload: data,
})

export const getHistoriesFailure = (error) => ({
  type: GET_HISTORIES_FAILURE,
  payload: error,
})
