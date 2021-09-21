import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, SET_ORDER_ERROR } from "../action-types";
import { checkoutRequest } from "../../utils/api";
import { getToken } from "../../utils/token";

export function getOrderNumber(data) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    const accessToken = getToken();
    checkoutRequest(data, accessToken)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: result,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export function setOrderError(data) {
  return function (dispatch) {
    dispatch({
      type: SET_ORDER_ERROR,
      payload: data,
    });
  };
}
