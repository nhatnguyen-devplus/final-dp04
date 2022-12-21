import { GET_DATA_SHEET, GET_DATA_SHEET_SUCCESS, GET_DATA_SHEET_FAILURE } from './constant'

export const getDataSheet = (data) => ({
  type: GET_DATA_SHEET,
  payload: data,
})

export const getDataSheetSuccess = (profile) => ({
  type: GET_DATA_SHEET_SUCCESS,
  payload: profile,
})

export const getDataSheetFailure = (error) => ({
  type: GET_DATA_SHEET_FAILURE,
  payload: error,
})
