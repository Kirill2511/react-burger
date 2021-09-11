import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../actions/userActions";
import { getCookie } from "../helpers";

const initialState = {
  user: null,
  isLoggined: !!getCookie("accessToken"),
  isForgotPasswordRequest: false,
  isResetPasswordRequest: false,
  isLoading: false,
  isLogout: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggined: true,
        isLoading: false,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggined: true,
        isLoading: false,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLogout: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggined: false,
        isLoading: false,
        isLogout: false,
      };

    case LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        isLogout: false,
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggined: true,
        isLoading: false,
      };

    case GET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggined: true,
        isLoading: false,
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isForgotPasswordRequest: true,
        isLoading: false,
      };

    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isResetPasswordRequest: true,
        isLoading: false,
      };

    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
