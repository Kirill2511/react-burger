import { getOrderDetailsRequest } from "../../utils/api";
import {
  GET_VIEW_ORDER_FAILED,
  GET_VIEW_ORDER_REQUEST,
  GET_VIEW_ORDER_SUCCESS,
  RESET_VIEW_ORDER,
  SET_VIEW_ORDER,
  SET_VIEW_ORDER_ERROR,
} from "../action-types";
import type { TId, TViewedOrder } from "../types/data";
import { AppDispatch, AppThunk } from "../types/redux";

export interface ISetViewOrder {
  readonly type: typeof SET_VIEW_ORDER;
  readonly payload: TViewedOrder;
}
export interface IResetViewOrder {
  readonly type: typeof RESET_VIEW_ORDER;
}

export interface IGetViewOrderRequest {
  readonly type: typeof GET_VIEW_ORDER_REQUEST;
}
export interface IGetViewOrderSuccess {
  readonly type: typeof GET_VIEW_ORDER_SUCCESS;
  readonly payload: TViewedOrder;
}
export interface IGetViewOrderFailed {
  readonly type: typeof GET_VIEW_ORDER_FAILED;
}
export interface ISetViewOrderError {
  readonly type: typeof SET_VIEW_ORDER_ERROR;
  readonly payload: string;
}

export type TViewedOrderActions =
  | IGetViewOrderFailed
  | IGetViewOrderSuccess
  | IGetViewOrderRequest
  | IResetViewOrder
  | ISetViewOrder
  | ISetViewOrderError;

export const setViewOrder = (data: TViewedOrder): TViewedOrderActions => ({
  type: SET_VIEW_ORDER,
  payload: data,
});
export const resetViewOrder = (): TViewedOrderActions => ({
  type: RESET_VIEW_ORDER,
});

export const getViewOrderRequest = (): TViewedOrderActions => ({
  type: GET_VIEW_ORDER_REQUEST,
});
export const getViewOrderSuccess = (data: TViewedOrder): TViewedOrderActions => ({
  type: GET_VIEW_ORDER_SUCCESS,
  payload: data,
});
export const getViewOrderFailed = (): TViewedOrderActions => ({
  type: GET_VIEW_ORDER_FAILED,
});
export const setViewOrderError = (data: string): TViewedOrderActions => ({
  type: SET_VIEW_ORDER_ERROR,
  payload: data,
});

const getOrderDetails: AppThunk = (id: TId) =>
  function (dispatch: AppDispatch) {
    dispatch(getViewOrderRequest());
    getOrderDetailsRequest(id)
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) throw result;
        dispatch(getViewOrderSuccess(result.orders[0]));
      })
      .catch(() => {
        dispatch(getViewOrderFailed());
      });
  };

export { getOrderDetails };
