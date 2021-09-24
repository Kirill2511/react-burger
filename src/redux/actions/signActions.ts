import { History } from "history";

import {
  apiGetProfileRequest,
  patchProfileRequest,
  postForgotPasswordRequest,
  postLoginRequest,
  postLogoutRequest,
  postRegisterRequest,
  postResetPasswordRequest,
} from "../../utils/api";
import { clearToken, getToken, setToken } from "../../utils/token";
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
import type {
  TSignData,
  TSignDataForgoutPassword,
  TSignDataLogin,
  TSignDataLogResetPassword,
  TSignDataWPassword,
} from "../types/data";
import { AppDispatch, AppThunk } from "../types/redux";

export interface IGetAuthRequest {
  readonly type: typeof GET_AUTH_REQUEST;
}
export interface IGetAuthSuccess {
  readonly type: typeof GET_AUTH_SUCCESS;
  readonly payload: TSignData;
}
export interface IGetAuthFailed {
  readonly type: typeof GET_AUTH_FAILED;
}
export interface ISetAuthError {
  readonly type: typeof SET_AUTH_ERROR;
  readonly payload: string;
}

export interface IGetRegisterRequest {
  readonly type: typeof GET_REGISTER_REQUEST;
}
export interface IGetRegisterSuccess {
  readonly type: typeof GET_REGISTER_SUCCESS;
  readonly payload: TSignDataWPassword;
}
export interface IGetRegisterFailed {
  readonly type: typeof GET_REGISTER_FAILED;
}
export interface ISetRegisterError {
  readonly type: typeof SET_REGISTER_ERROR;
  readonly payload: string;
}

export interface IGetProfileRequest {
  readonly type: typeof GET_PROFILE_REQUEST;
}
export interface IGetProfileSuccess {
  readonly type: typeof GET_PROFILE_SUCCESS;
  readonly payload: TSignDataWPassword;
}
export interface IGetProfileFailed {
  readonly type: typeof GET_PROFILE_FAILED;
}
export interface ISetProfileError {
  readonly type: typeof SET_PROFILE_ERROR;
  readonly payload: string;
}
export interface IGetProfileClear {
  readonly type: typeof SET_PROFILE_CLEAR;
}

export type TSignActions =
  | IGetProfileClear
  | ISetProfileError
  | IGetProfileFailed
  | IGetProfileSuccess
  | IGetProfileRequest
  | ISetRegisterError
  | IGetRegisterFailed
  | IGetRegisterSuccess
  | IGetRegisterRequest
  | ISetAuthError
  | IGetAuthFailed
  | IGetAuthSuccess
  | IGetAuthRequest;

export const getAuthRequest = (): TSignActions => ({
  type: GET_AUTH_REQUEST,
});
export const getAuthSuccess = (data: TSignData): TSignActions => ({
  type: GET_AUTH_SUCCESS,
  payload: data,
});
export const getAuthFailed = (): TSignActions => ({
  type: GET_AUTH_FAILED,
});
export const setAuthError = (data: string): TSignActions => ({
  type: SET_AUTH_ERROR,
  payload: data,
});

export const getRegisterRequest = (): TSignActions => ({
  type: GET_REGISTER_REQUEST,
});
export const getRegisterSuccess = (data: TSignDataWPassword): TSignActions => ({
  type: GET_REGISTER_SUCCESS,
  payload: data,
});
export const getRegisterFailed = (): TSignActions => ({
  type: GET_REGISTER_FAILED,
});
export const setRegisterError = (data: string): TSignActions => ({
  type: SET_REGISTER_ERROR,
  payload: data,
});

export const getProfileRequest = (): TSignActions => ({
  type: GET_PROFILE_REQUEST,
});
export const getProfileSuccess = (data: TSignDataWPassword): TSignActions => ({
  type: GET_PROFILE_SUCCESS,
  payload: data,
});
export const getProfileFailed = (): TSignActions => ({
  type: GET_PROFILE_FAILED,
});
export const setProfileError = (data: string): TSignActions => ({
  type: SET_PROFILE_ERROR,
  payload: data,
});
export const getProfileClear = (): TSignActions => ({
  type: SET_PROFILE_CLEAR,
});

const getRegister: AppThunk = (data: TSignDataWPassword) =>
  function (dispatch: AppDispatch) {
    dispatch(getRegisterRequest());

    postRegisterRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        setToken({ accessToken: result.accessToken, refreshToken: result.refreshToken });
        dispatch(getRegisterSuccess(result.user));
      })
      .catch(() => {
        dispatch(getRegisterFailed());
      });
  };

const getLogin: AppThunk = (data: TSignDataLogin) =>
  function (dispatch: AppDispatch) {
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

const getLogout: AppThunk = (token: string) =>
  function (dispatch: AppDispatch) {
    dispatch(getAuthRequest());

    postLogoutRequest(token)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then(() => {
        clearToken();
        dispatch(getProfileClear());
      })
      .catch(() => {
        dispatch(getAuthFailed());
      });
  };

const updateProfile: AppThunk = (data: TSignDataWPassword) =>
  function (dispatch: AppDispatch) {
    dispatch(getProfileRequest());

    const accessToken = getToken() as string;
    patchProfileRequest(data, accessToken)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        if (!result.success) throw result;
        dispatch(getProfileSuccess(result.user));
      })
      .catch((error) => {
        console.log(error); //
        if (error.message === "jwt expired") dispatch(getProfileFailed());
      });
  };

const getProfile: AppThunk = () =>
  function (dispatch: AppDispatch) {
    dispatch(getProfileRequest());

    const accessToken = getToken() as string;
    apiGetProfileRequest(accessToken)
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) throw result;
        dispatch(getProfileSuccess(result.user));
      })
      .catch((error) => {
        if (error.message === "jwt expired") dispatch(getProfileFailed());
      });
  };

const getForgotPassword: AppThunk = (data: TSignDataForgoutPassword, history: History) =>
  function () {
    postForgotPasswordRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        history.push({
          pathname: "/reset-password",
          state: { resetPassword: true },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

const getResetPassword: AppThunk = (data: TSignDataLogResetPassword, history: History) =>
  function () {
    postResetPasswordRequest(data)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) =>
        history.push({
          pathname: "/login",
          state: { resetPassword: true },
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

export { getForgotPassword, getLogin, getLogout, getProfile, getRegister, getResetPassword, updateProfile };
