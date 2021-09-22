import {
  SET_VIEW_ORDER,
  RESET_VIEW_ORDER,
  GET_VIEW_ORDER_REQUEST,
  GET_VIEW_ORDER_SUCCESS,
  GET_VIEW_ORDER_FAILED,
  SET_VIEW_ORDER_ERROR,
} from "../action-types";
import { getOrderDetailsRequest } from "../../utils/api";

export const setViewOrder = (data) => ({
  type: SET_VIEW_ORDER,
  payload: data,
});
export const resetViewOrder = () => ({
  type: RESET_VIEW_ORDER,
});

export const getViewOrderRequest = () => ({
  type: GET_VIEW_ORDER_REQUEST,
});
export const getViewOrderSuccess = (data) => ({
  type: GET_VIEW_ORDER_SUCCESS,
  payload: data,
});
export const getViewOrderFailed = () => ({
  type: GET_VIEW_ORDER_FAILED,
});
export const setViewOrderError = (data) => ({
  type: SET_VIEW_ORDER_ERROR,
  payload: data,
});

function getOrderDetails(id) {
  return function (dispatch) {
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
}

export { getOrderDetails };
