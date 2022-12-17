import { GET_ALL_DAYS_OFF, GET_ALL_DAYS_OFF_SUCCESS, GET_ALL_DAYS_OFF_FAILURE } from './constant'

const INITIAL_STATE = {
  dataList: null,
  loading: true,
  error: null,
  response: null,
}

const daysOffReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_DAYS_OFF: {
      return {
        ...state,
        loading: true,
        response: null,
        error: null,
      }
    }

    case GET_ALL_DAYS_OFF_SUCCESS:
      return {
        ...state,
        loading: false,
        dataList: action.payload.data,
      }

    case GET_ALL_DAYS_OFF_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default daysOffReducer
