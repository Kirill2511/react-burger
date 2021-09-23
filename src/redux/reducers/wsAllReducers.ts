import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../action-types";
import type { TWsAllActions } from '../actions';
import type { TOrderWSAll } from '../types/data';

type TWsAllState = {
  wsConnected: boolean;
  data: TOrderWSAll;
  wsConnectionFailed: boolean;
  error: string | null;
}

export const initialState: TWsAllState = {
  wsConnected: false,
  data: {} as TOrderWSAll,
  error: null,
  wsConnectionFailed: false
};

export const wsAllReducer = (state = initialState, action: TWsAllActions): TWsAllState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectionFailed: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        wsConnectionFailed: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: null,
        wsConnected: false,
        wsConnectionFailed: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
