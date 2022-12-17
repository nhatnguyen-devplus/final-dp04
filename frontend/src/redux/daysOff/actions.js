import { GET_ALL_DAYS_OFF, GET_ALL_DAYS_OFF_SUCCESS, GET_ALL_DAYS_OFF_FAILURE } from './constant'

export const getAllDaysOff = () => ({
  type: GET_ALL_DAYS_OFF,
})

export const getAllDaysOffSuccess = (profile) => ({
  type: GET_ALL_DAYS_OFF_SUCCESS,
  payload: profile,
})

export const getAllDaysOffFailure = (error) => ({
  type: GET_ALL_DAYS_OFF_FAILURE,
  payload: error,
})
