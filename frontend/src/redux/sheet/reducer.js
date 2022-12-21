import { GET_DATA_SHEET, GET_DATA_SHEET_SUCCESS, GET_DATA_SHEET_FAILURE } from './constant'

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  response: null,
}

const sheetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DATA_SHEET: {
      return {
        ...state,
        loading: true,
        response: null,
        error: null,
        data: null,
      }
    }

    case GET_DATA_SHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data.map((item) => ({
          name: item.user?.name,
          from: item.logofffrom,
          to: item.logoffto,
          reason: item.reason,
          quantity: item.quantity,
          contentlog: item.contentlog,
        })),
        response: action.payload,
      }

    case GET_DATA_SHEET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default sheetReducer
