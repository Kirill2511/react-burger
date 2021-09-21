import {
  SET_VIEW_ORDER,
  RESET_VIEW_ORDER,
  GET_VIEW_ORDER_REQUEST,
  GET_VIEW_ORDER_SUCCESS,
  GET_VIEW_ORDER_FAILED,
  SET_VIEW_ORDER_ERROR,
} from "../action-types";

const initialState = {
  data: {},
  isLoaded: false,
  isFetching: false,
  fetchingFailed: false,
  error: null,
};

export const viewedOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW_ORDER: {
      return {
        ...state,
        data: action.payload,
        isLoaded: true,
      };
    }
    case RESET_VIEW_ORDER: {
      return {
        ...state,
        data: initialState.data,
      };
    }
    case GET_VIEW_ORDER_REQUEST: {
      return {
        ...state,
        fetchingFailed: false,
        isFetching: true,
      };
    }
    case GET_VIEW_ORDER_SUCCESS: {
      console.log("GET_VIEW_ORDER_SUCCESS", action.payload);
      return {
        ...state,
        fetchingFailed: false,
        data: action.payload,
        isLoaded: false,
        isFetching: false,
      };
    }
    case GET_VIEW_ORDER_FAILED: {
      return {
        ...state,
        fetchingFailed: true,
        isFetching: false,
      };
    }
    case SET_VIEW_ORDER_ERROR: {
      return {
        ...state,
        fetchingFailed: true,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
