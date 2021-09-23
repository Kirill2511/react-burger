import {
  GET_AUTH_FAILED,
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_REGISTER_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  SET_AUTH_ERROR,
  SET_PROFILE_CLEAR,
  SET_PROFILE_ERROR,
  SET_REGISTER_ERROR,
} from "../action-types";
import type { TSignActions } from "../actions";
import type { TSignDataWPassword } from "../types/data";

type TSignState = {
  user: TSignDataWPassword;
  isAuthorized: boolean;
  isFetching: boolean;
  fetchingFailed: boolean;
  lastUpdated: number | null;
  error: string | null;
};

export const initialState: TSignState = {
  user: {} as TSignDataWPassword,
  isAuthorized: false,
  isFetching: false,
  fetchingFailed: false,
  lastUpdated: null,
  error: null,
};

export const signReduser = (state = initialState, action: TSignActions): TSignState => {
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
        user: initialState.user,
        isAuthorized: false
      };

    default:
      return state;
  }
};
