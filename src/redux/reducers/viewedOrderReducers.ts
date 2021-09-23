import {
  GET_VIEW_ORDER_FAILED,
  GET_VIEW_ORDER_REQUEST,
  GET_VIEW_ORDER_SUCCESS,
  RESET_VIEW_ORDER,
  SET_VIEW_ORDER,
  SET_VIEW_ORDER_ERROR,
} from "../action-types";
import type { TViewedOrderActions } from "../actions";
import type { TViewedOrder } from "../types/data";

type TViewedOrderState = {
  data: TViewedOrder;
  isLoaded: boolean;
  lastUpdated: number | null;
  isFetching: boolean;
  fetchingFailed: boolean;
  error: string | null;
};

export const initialState: TViewedOrderState = {
  data: {} as TViewedOrder,
  isLoaded: false,
  lastUpdated: null,
  isFetching: false,
  fetchingFailed: false,
  error: null,
};

export const viewedOrderReducer = (state = initialState, action: TViewedOrderActions): TViewedOrderState => {
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
