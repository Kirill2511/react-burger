import {
  SET_VIEW_ORDER,
  RESET_VIEW_ORDER,
  GET_VIEW_ORDER_REQUEST,
  GET_VIEW_ORDER_SUCCESS,
  GET_VIEW_ORDER_FAILED,
  SET_VIEW_ORDER_ERROR,
} from "../action-types";
import { getOrderDetailsRequest } from "../../utils/api";

function setViewOrder(orderData) {
  return function (dispatch) {
    dispatch({
      type: SET_VIEW_ORDER,
      payload: orderData,
    });
  };
}

function resetViewOrder() {
  return function (dispatch) {
    dispatch({
      type: RESET_VIEW_ORDER,
    });
  };
}

function getOrderDetails(id) {
  return function (dispatch) {
    dispatch({
      type: GET_VIEW_ORDER_REQUEST,
    });
    getOrderDetailsRequest(id)
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) throw result;
        dispatch({
          type: GET_VIEW_ORDER_SUCCESS,
          payload: result.orders[0],
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_VIEW_ORDER_FAILED,
        });
        dispatch({
          type: SET_VIEW_ORDER_ERROR,
          payload: e.message,
        });
      });
  };
}

export { setViewOrder, resetViewOrder, getOrderDetails };
