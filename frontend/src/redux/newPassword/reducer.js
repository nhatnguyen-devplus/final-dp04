import { POST_NEW_PASSWORD, POST_NEW_PASSWORD_SUCCESS, POST_NEW_PASSWORD_FAILURE } from './constant'

const INITIAL_STATE = {
  dataList: null,
  loading: true,
  error: null,
  response: null,
}

const newPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_NEW_PASSWORD: {
      return {
        ...state,
        loading: true,
        response: null,
        error: null,
      }
    }

    case POST_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        dataList: action.payload.data,
        response: action.payload,
      }

    case POST_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default newPasswordReducer
