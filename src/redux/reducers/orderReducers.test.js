import * as mocks from "../../utils/mock";
import * as actionsTypes from "../action-types";
import * as actions from "../actions";
import { initialState, orderReducer as reducer } from "./orderReducers";

describe("audit orderReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle get order request success - ${actionsTypes.GET_ORDER_SUCCESS}`, () => {
    expect(reducer(initialState, actions.getOrderSuccess(mocks.dataTOrder))).toEqual({
      ...initialState,
      data: mocks.dataTOrder,
      numberOrd: mocks.dataTOrder.number,
    });
  });

  it(`should handle get order request - ${actionsTypes.GET_ORDER_REQUEST}`, () => {
    expect(reducer(initialState, actions.getOrderRequest())).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it(`should handle get order request failure - ${actionsTypes.GET_ORDER_FAILED}`, () => {
    expect(reducer(initialState, actions.getOrderFailed())).toEqual({
      ...initialState,
      fetchingFailed: true,
      isFetching: false,
    });
  });
});
