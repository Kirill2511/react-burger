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
import { setToken, refreshToken, clearToken, getToken } from "../../utils/token";

import {
  postRegisterRequest,
  postLoginRequest,
  postLogoutRequest,
  patchProfileRequest,
  getProfileRequest,
  postForgotPasswordRequest,
  postResetPasswordRequest,
} from "../../utils/api";

function getRegister(data) {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });

    postRegisterRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        setToken({ accessToken: result.accessToken, refreshToken: result.refreshToken });
        dispatch({
          type: GET_REGISTER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_REGISTER_FAILED,
        });
      });
  };
}

function getLogin(data) {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });

    postLoginRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        setToken({ accessToken: result.accessToken, refreshToken: result.refreshToken });
        dispatch({
          type: GET_AUTH_SUCCESS,
          payload: result.user,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: GET_AUTH_FAILED,
        });
      });
  };
}

function getLogout(token) {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });

    postLogoutRequest(token)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        clearToken();
        dispatch({
          type: SET_PROFILE_CLEAR,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_AUTH_FAILED,
        });
      });
  };
}

function updateProfile(data) {
  return function (dispatch) {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const accessToken = getToken();
    patchProfileRequest(data, accessToken)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        if (!result.success) throw result;
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: result.user,
        });
      })
      .catch((e) => {
        if (e.message === "jwt expired") {
          dispatch(refreshToken(getProfile()));
        }
        dispatch({
          type: GET_PROFILE_FAILED,
        });
      });
  };
}

function getProfile() {
  return function (dispatch) {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const accessToken = getToken();
    getProfileRequest(accessToken)
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) throw result;
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: result.user,
        });
      })
      .catch((res) => {
        if (res.message === "jwt expired") {
          dispatch(refreshToken(getProfile()));
        }
        dispatch({
          type: GET_PROFILE_FAILED,
        });
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
