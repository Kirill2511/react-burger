import { API_LINK_ORDERS } from "../api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SET_ORDER_ITEMS = "SET_ORDER_ITEMS";

export const getOrder = (payload) => async (dispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });

  return await fetch(API_LINK_ORDERS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      }
        throw new Error("Something went wrong");

    })
    .then((response) => {
      if (response && response.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderId: response.order.number,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: GET_ORDER_FAILED,
      });
    });
};

export const setOrderItems = (itemsId) => (dispatch) => {
  dispatch({
    type: SET_ORDER_ITEMS,
    itemsId,
  });
};
