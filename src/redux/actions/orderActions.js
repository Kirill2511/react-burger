import { addConstructorIngredient, resetConstructor } from "./constructorActions";
import dataEmpty from "../../utils/mock/data-mock-empty";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, SET_ORDER_ERROR } from "../action-types";
import { checkoutRequest } from "../../utils/api";
import { getToken } from "../../utils/token";

export const getOrderRequest = () => ({
  type: GET_ORDER_REQUEST,
});
export const getOrderSuccess = (data) => ({
  type: GET_ORDER_SUCCESS,
  payload: data,
});
export const getOrderFailed = () => ({
  type: GET_ORDER_FAILED,
});
export const setOrderError = (data) => ({
  type: SET_ORDER_ERROR,
  payload: data,
});

export function getOrderNumber(data) {
  return function (dispatch) {
    dispatch(getOrderRequest());
    const accessToken = getToken();
    checkoutRequest(data, accessToken)
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        dispatch(getOrderSuccess(result.order));

        dispatch(resetConstructor());

        dispatch(addConstructorIngredient(dataEmpty.find((item) => item.type === "empty")));
      })
      .catch(() => {
        dispatch(getOrderFailed());
      });
  };
}
