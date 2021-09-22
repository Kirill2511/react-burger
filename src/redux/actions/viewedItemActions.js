import { SET_VIEW_ITEM, RESET_VIEW_ITEM } from "../action-types";

export const setViewItem = (data) => ({
  type: SET_VIEW_ITEM,
  payload: data,
});

export const resetViewItem = () => ({
  type: RESET_VIEW_ITEM,
});
