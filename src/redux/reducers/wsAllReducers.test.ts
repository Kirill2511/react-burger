import * as mocks from "../../utils/mock";
import * as actionsTypes from "../action-types";
import * as actions from "../actions";
import { TWsAllActions } from "../actions";
import { initialState, wsAllReducer as reducer } from "./wsAllReducers";

describe("audit wsAllReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as TWsAllActions)).toEqual(initialState);
  });

  it(`should handle connect websocket - ${actionsTypes.WS_CONNECTION_SUCCESS}`, () => {
    expect(reducer(initialState, actions.wsAllConnectionSuccess())).toEqual({
      ...initialState,
      wsConnected: true,
      wsConnectionFailed: false,
    });
  });

  it(`should handle error from websocket - ${actionsTypes.WS_CONNECTION_ERROR}`, () => {
    const payload = "test error ";
    expect(reducer(initialState, actions.wsAllConnectionError(payload))).toEqual({
      ...initialState,
      error: payload,
      wsConnected: false,
      wsConnectionFailed: true,
    });
  });

  it(`should handle close websocket - ${actionsTypes.WS_CONNECTION_CLOSED}`, () => {
    expect(reducer(initialState, actions.wsAllConnectionClosed())).toEqual({
      ...initialState,
      error: null,
      wsConnected: false,
      wsConnectionFailed: false,
    });
  });

  it(`should handle get websocket message  - ${actionsTypes.WS_GET_MESSAGE}`, () => {
    expect(reducer(initialState, actions.wsAllGetMessage(mocks.dataTWSAllOrders))).toEqual({
      ...initialState,
      data: mocks.dataTWSAllOrders,
    });
  });
});
