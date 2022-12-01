import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  GET_LIST_POST_FAILURE,
  POST_LIST_POST,
  POST_LIST_POST_FAILURE,
  POST_LIST_POST_SUCCESS,
} from './constant'
const INITIAL_STATE = {
  data: [],
  loading: true,
  error: null,
  postData: null,
}
const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return {
        ...state,
        loading: true,
      }
    case GET_LIST_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case GET_LIST_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case POST_LIST_POST:
      return {
        ...state,
        loading: true,
      }
    case POST_LIST_POST_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        loading: false,
      }
    case POST_LIST_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default postsReducer
