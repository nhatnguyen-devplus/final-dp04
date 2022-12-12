import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  GET_ME,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from './constant'

const INITIAL_STATE = {
  data: [],
  dataById: null,
  profile: null,
  loading: false,
  error: null,
  response: null,
}

const membersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      return {
        ...state,
        loading: true,
        response: null,
        error: null,
      }
    }

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_USER_BY_ID: {
      return {
        ...state,
        loading: true,
        dataById: null,
      }
    }

    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        dataById: action.payload,
      }

    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        dataById: action.payload,
        loading: false,
      }

    case CREATE_USER: {
      return {
        ...state,
        loading: true,
        response: null,
      }
    }

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_USER: {
      return {
        ...state,
        loading: true,
        response: null,
      }
    }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_ME: {
      return {
        ...state,
        loading: true,
        // response: null,
      }
    }

    case GET_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      }

    case GET_ME_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_USER: {
      return {
        ...state,
        loading: true,
        response: null,
      }
    }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      }

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default membersReducer
