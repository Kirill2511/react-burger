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
import { setToken, clearToken, getToken } from "../../utils/token";

import {
  postRegisterRequest,
  postLoginRequest,
  postLogoutRequest,
  patchProfileRequest,
  apiGetProfileRequest,
  postForgotPasswordRequest,
  postResetPasswordRequest,
} from "../../utils/api";

export const getAuthRequest = () => ({
  type: GET_AUTH_REQUEST,
});
export const getAuthSuccess = (data) => ({
  type: GET_AUTH_SUCCESS,
  payload: data,
});
export const getAuthFailed = () => ({
  type: GET_AUTH_FAILED,
});
export const setAuthError = (data) => ({
  type: SET_AUTH_ERROR,
  payload: data,
});

export const getRegisterRequest = () => ({
  type: GET_REGISTER_REQUEST,
});
export const getRegisterSuccess = (data) => ({
  type: GET_REGISTER_SUCCESS,
  payload: data,
});
export const getRegisterFailed = () => ({
  type: GET_REGISTER_FAILED,
});
export const setRegisterError = (data) => ({
  type: SET_REGISTER_ERROR,
  payload: data,
});

export const getProfileRequest = () => ({
  type: GET_PROFILE_REQUEST,
});
export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  payload: data,
});
export const getProfileFailed = () => ({
  type: GET_PROFILE_FAILED,
});
export const setProfileError = (data) => ({
  type: SET_PROFILE_ERROR,
  payload: data,
});
export const getProfileClear = () => ({
  type: SET_PROFILE_CLEAR,
});

function getRegister(data) {
  return function (dispatch) {
    dispatch(getRegisterRequest());

    postRegisterRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        setToken({ accessToken: result.accessToken, refreshToken: result.refreshToken });
        dispatch(getRegisterSuccess(result.user));
      })
      .catch((e) => {
        dispatch(getRegisterFailed());
      });
  };
}

function getLogin(data) {
  return function (dispatch) {
    dispatch(getAuthRequest());

    postLoginRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        setToken({ accessToken: result.accessToken, refreshToken: result.refreshToken });
        dispatch(getAuthSuccess(result.user));
      })
      .catch(() => {
        dispatch(getAuthFailed());
      });
  };
}

function getLogout(token) {
  return function (dispatch) {
    dispatch(getAuthRequest());

    postLogoutRequest(token)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        clearToken();
        dispatch(getProfileClear());
      })
      .catch((e) => {
        dispatch(getAuthFailed());
      });
  };
}

function updateProfile(data) {
  return function (dispatch) {
    dispatch(getProfileRequest());

    const accessToken = getToken();
    patchProfileRequest(data, accessToken)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        if (!result.success) throw result;
        dispatch(getProfileSuccess(result.user));
      })
      .catch((e) => {
        if (e.message === "jwt expired") dispatch(getProfileFailed());
      });
  };
}

function getProfile() {
  return function (dispatch) {
    dispatch(getProfileRequest());

    const accessToken = getToken();
    apiGetProfileRequest(accessToken)
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) throw result;
        dispatch(getProfileSuccess(result.user));
      })
      .catch((res) => {
        if (res.message === "jwt expired") dispatch(getProfileFailed());
      });
  };
}

function getForgotPassword(data, history) {
  return function () {
    postForgotPasswordRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        history.push({
          pathname: "/reset-password",
          state: { resetPassword: true },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

function getResetPassword(data, history) {
  return function () {
    postResetPasswordRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        history.push({
          pathname: "/login",
          state: { resetPassword: true },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export { getRegister, getLogin, getLogout, updateProfile, getProfile, getForgotPassword, getResetPassword };
