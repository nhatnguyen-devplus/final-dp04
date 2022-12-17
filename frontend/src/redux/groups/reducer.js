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

const INITIAL_STATE = {
  data: [],
  dataList: null,
  loading: true,
  error: null,
  response: null,
}

const groupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS: {
      return {
        ...state,
        loading: true,
        response: null,
        error: null,
      }
    }

    case GET_ALL_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataList: action.payload.data,
      }

    case GET_ALL_GROUPS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_GROUP_BY_ID: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_GROUP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      }

    case GET_GROUP_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_CREATE_GROUP: {
      return {
        ...state,
        loading: true,
        response: null,
      }
    }

    case POST_CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case POST_CREATE_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_GROUP: {
      return {
        ...state,
        loading: true,
      }
    }

    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case UPDATE_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_GROUP: {
      return {
        ...state,
        loading: true,
        response: null,
      }
    }

    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case DELETE_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default groupsReducer
