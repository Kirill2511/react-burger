import * as mocks from "../../utils/mock";
import * as actionsTypes from "../action-types";
import * as actions from "../actions";
import { TViewedOrderActions } from "../actions";
import { initialState, viewedOrderReducer as reducer } from "./viewedOrderReducers";

describe("audit viewedOrderReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as TViewedOrderActions)).toEqual(initialState);
  });

  it(`should handle set view item - ${actionsTypes.SET_VIEW_ITEM}`, () => {
    expect(reducer(initialState, actions.setViewOrder(mocks.dataTViewedOrder))).toEqual({
      ...initialState,
      isLoaded: true,
      data: mocks.dataTViewedOrder,
    });
  });

  it(`should handle reset view item - ${actionsTypes.RESET_VIEW_ITEM}`, () => {
    expect(reducer(initialState, actions.resetViewOrder())).toEqual({
      ...initialState,
    });
  });

  it(`should handle get view order request success - ${actionsTypes.GET_VIEW_ORDER_SUCCESS}`, () => {
    expect(reducer(initialState, actions.getViewOrderSuccess(mocks.dataTViewedOrder))).toEqual({
      ...initialState,
      data: mocks.dataTViewedOrder,
    });
  });

  it(`should handle get view order request - ${actionsTypes.GET_VIEW_ORDER_REQUEST}`, () => {
    expect(reducer(initialState, actions.getViewOrderRequest())).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it(`should handle get view order request failure - ${actionsTypes.SET_VIEW_ORDER_ERROR}`, () => {
    expect(reducer(initialState, actions.getViewOrderFailed())).toEqual({
      ...initialState,
      fetchingFailed: true,
      isFetching: false,
    });
  });
});
