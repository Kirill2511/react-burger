import {
  WS_SIGN_CONNECTION_CLOSED,
  WS_SIGN_CONNECTION_ERROR,
  WS_SIGN_CONNECTION_SUCCESS,
  WS_SIGN_GET_MESSAGE,
} from "../action-types";
import type { TWsSignActions } from "../actions";
import type { TOrderWSAll } from "../types/data";

type TWsSignState = {
  wsConnected: boolean;
  data: TOrderWSAll;
  wsConnectionFailed: boolean;
  error: string | null;
};

export const initialState: TWsSignState = {
  wsConnected: false,
  data: {} as TOrderWSAll,
  error: null,
  wsConnectionFailed: false,
};
export const wsSignReducer = (state = initialState, action: TWsSignActions): TWsSignState => {
  switch (action.type) {
    case WS_SIGN_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectionFailed: false,
      };

    case WS_SIGN_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        wsConnectionFailed: true,
      };

    case WS_SIGN_CONNECTION_CLOSED:
      return {
        ...state,
        error: null,
        wsConnected: false,
        wsConnectionFailed: false,
      };

    case WS_SIGN_GET_MESSAGE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
