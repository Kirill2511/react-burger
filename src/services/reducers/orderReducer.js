import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  SET_ORDER_ITEMS,
} from "../actions/orderActions";

export const initialState = {
  orderId: null,
  itemsId: [],
  isLoading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderId: action.orderId,
      };

    case GET_ORDER_FAILED:
      return {
        ...state,
        orderId: null,
        isLoading: false,
      };

    case SET_ORDER_ITEMS:
      return {
        ...state,
        itemsId: action.itemsId,
      };

    default:
      return state;
  }
};
