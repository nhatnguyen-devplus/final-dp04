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

const INITIAL_STATE = {
  dataAll: [],
  data: {},
  loading: true,
  error: null,
  response: null,
}

const requestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_REQUESTS: {
      return {
        ...state,
        loading: true,
        error: null,
        response: null,
      }
    }

    case GET_ALL_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataAll: action.payload,
      }

    case GET_ALL_REQUESTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_REQUEST_BY_ID: {
      return {
        ...state,
        loading: true,
        error: null,
        response: null,
      }
    }

    case GET_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      }

    case GET_REQUEST_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case CREATE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case CREATE_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default requestsReducer
