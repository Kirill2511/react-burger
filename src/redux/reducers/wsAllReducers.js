import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from "../action-types";

export const initialState = {
  wsConnected: false,
  data: {},
  error: null,
  wsConnectionFailed: false,
};

export const wsAllReducer = (state = initialState, action) => {
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
