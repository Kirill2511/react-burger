import { signReduser as reducer, initialState } from "./signReducers";
import * as actions from "../actions";
import * as mocks from "../../utils/mock";
import * as actionsTypes from "../action-types";

describe("audit signReduser", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle get auth request success - ${actionsTypes.GET_AUTH_SUCCESS}`, () => {
    const payload = mocks.dataTSignData;
    expect(reducer(initialState, actions.getAuthSuccess(payload))).toEqual({
      ...initialState,
      user: mocks.dataTSignData,
      isAuthorized: true,
    });
  });

  it(`should handle get auth request - ${actionsTypes.GET_AUTH_REQUEST}`, () => {
    expect(reducer(initialState, actions.getAuthRequest())).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it(`should handle get auth request failure - ${actionsTypes.GET_AUTH_FAILED}`, () => {
    expect(reducer(initialState, actions.getAuthFailed())).toEqual({
      ...initialState,
      fetchingFailed: true,
      isFetching: false,
    });
  });

  it(`should handle get register request success - ${actionsTypes.GET_REGISTER_SUCCESS}`, () => {
    const payload = mocks.dataTSignData;
    expect(reducer(initialState, actions.getRegisterSuccess(payload))).toEqual({
      ...initialState,
      user: mocks.dataTSignData,
      isAuthorized: true,
    });
  });

  it(`should handle get register request - ${actionsTypes.GET_REGISTER_REQUEST}`, () => {
    expect(reducer(initialState, actions.getRegisterRequest())).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it(`should handle get register request failure - ${actionsTypes.GET_REGISTER_FAILED}`, () => {
    expect(reducer(initialState, actions.getRegisterFailed())).toEqual({
      ...initialState,
      fetchingFailed: true,
      isFetching: false,
    });
  });

  it(`should handle get profile request success - ${actionsTypes.GET_PROFILE_SUCCESS}`, () => {
    const payload = mocks.dataTSignData;
    expect(reducer(initialState, actions.getProfileSuccess(payload))).toEqual({
      ...initialState,
      user: mocks.dataTSignData,
      isAuthorized: true,
    });
  });

  it(`should handle get profile request - ${actionsTypes.GET_PROFILE_REQUEST}`, () => {
    expect(reducer(initialState, actions.getProfileRequest())).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it(`should handle get profile request failure - ${actionsTypes.GET_PROFILE_FAILED}`, () => {
    expect(reducer(initialState, actions.getProfileFailed())).toEqual({
      ...initialState,
      fetchingFailed: true,
      isFetching: false,
    });
  });

  it(`should handle get profile clear - ${actionsTypes.SET_PROFILE_CLEAR}`, () => {
    expect(reducer(initialState, actions.getProfileClear())).toEqual({
      ...initialState,
      isAuthorized: false,
    });
  });
});
