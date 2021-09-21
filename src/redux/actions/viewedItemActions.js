import { SET_VIEW_ITEM, RESET_VIEW_ITEM } from "../action-types";

function setViewItem(itemData) {
  return function (dispatch) {
    dispatch({
      type: SET_VIEW_ITEM,
      payload: itemData,
    });
  };
}

function resetViewItem() {
  return function (dispatch) {
    dispatch({
      type: RESET_VIEW_ITEM,
    });
  };
}

export { setViewItem, resetViewItem };
