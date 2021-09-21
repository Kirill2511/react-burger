import {
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  SET_AUTH_ERROR,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  SET_REGISTER_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  SET_PROFILE_ERROR,
  SET_PROFILE_CLEAR,
} from "../action-types";

export const initialState = {
  user: {
    name: null,
    email: null,
    password: null,
  },
  isAuthorized: false,
  isFetching: false,
  fetchingFailed: false,
  error: null,
};

export const signReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_REQUEST:
      return {
        ...state,
        fetchingFailed: false,
        isAuthorized: false,
        isFetching: true,
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        fetchingFailed: false,
        isAuthorized: true,
        user: action.payload,
        isFetching: false,
      };
    case GET_AUTH_FAILED:
      return {
        ...state,
        fetchingFailed: true,
        isAuthorized: false,
        isFetching: false,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        fetchingFailed: true,
        error: action.payload,
      };
    case GET_REGISTER_REQUEST:
      return {
        ...state,
        fetchingFailed: false,
        isAuthorized: false,
        isFetching: true,
      };
    case GET_REGISTER_SUCCESS:
      return {
        ...state,
        fetchingFailed: false,
        isAuthorized: true,
        user: action.payload,
        isFetching: false,
      };
    case GET_REGISTER_FAILED:
      return {
        ...state,
        fetchingFailed: true,
        isAuthorized: false,
        isFetching: false,
      };
    case SET_REGISTER_ERROR:
      return {
        ...state,
        fetchingFailed: true,
        error: action.payload,
      };
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        fetchingFailed: false,
        isFetching: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        fetchingFailed: false,
        isAuthorized: true,
        user: action.payload,
        isFetching: false,
      };
    case GET_PROFILE_FAILED:
      return {
        ...state,
        fetchingFailed: true,
        isAuthorized: false,
        isFetching: false,
      };
    case SET_PROFILE_ERROR:
      return {
        ...state,
      };
    case SET_PROFILE_CLEAR:
      return {
        ...state,
        user: {
          name: null,
          email: null,
          password: null,
        },
        isAuthorized: false,
      };

    default:
      return state;
  }
};
