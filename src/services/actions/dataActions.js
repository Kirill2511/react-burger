import { API_LINK_INGREDIENTS } from "../api";

export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export const ADD_BUN = "ADD_BUN";
export const ADD_ITEM = "ADD_ITEM";
export const DEL_ITEM = "DEL_ITEM";
export const ACTION_ITEM = "ACTION_ITEM";
export const RESET_STATE = "RESET_STATE";

export const addBun = (item) => ({
  type: ADD_BUN,
  bun: item,
});

export const addtem = (item) => ({
  type: ADD_ITEM,
  item: item,
  constructorItemId: item,
});

export const delItem = (itemId) => ({
  type: DEL_ITEM,
  itemId: itemId,
});

export const actionItem = (dragIndex, hoverIndex) => ({
  type: ACTION_ITEM,
  dragIndex,
  hoverIndex,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const getData = () => async (dispatch) => {
  dispatch({
    type: GET_DATA_REQUEST,
  });

  return await fetch(API_LINK_INGREDIENTS)
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((response) => {
      if (response && response.success) {
        dispatch({
          type: GET_DATA_SUCCESS,
          data: response.data,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: GET_DATA_FAILED,
      });
    });
};
