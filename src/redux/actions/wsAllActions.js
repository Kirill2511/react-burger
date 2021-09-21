import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from "../action-types";

const wsAllInit = () => ({
  type: WS_CONNECTION_START,
});

const wsAllClose = () => ({
  type: WS_CONNECTION_STOP,
});

const wsAllConnectionSuccess = () => ({
  type: WS_CONNECTION_SUCCESS,
});

const wsAllConnectionError = (error) => ({
  type: WS_CONNECTION_ERROR,
  payload: error,
});

const wsAllConnectionClosed = () => ({
  type: WS_CONNECTION_CLOSED,
});

const wsAllGetMessage = (data) => ({
  type: WS_GET_MESSAGE,
  payload: data,
});

export { wsAllConnectionSuccess, wsAllConnectionError, wsAllConnectionClosed, wsAllGetMessage, wsAllInit, wsAllClose };
