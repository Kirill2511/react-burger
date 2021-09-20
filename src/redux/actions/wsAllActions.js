import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from "../action-types";

const wsAllInit = () => {
  return {
    type: WS_CONNECTION_START,
  };
};

const wsAllClose = () => {
  return {
    type: WS_CONNECTION_STOP,
  };
};

const wsAllConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

const wsAllConnectionError = (error) => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error,
  };
};

const wsAllConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

const wsAllGetMessage = (data) => {
  return {
    type: WS_GET_MESSAGE,
    payload: data,
  };
};

export { wsAllConnectionSuccess, wsAllConnectionError, wsAllConnectionClosed, wsAllGetMessage, wsAllInit, wsAllClose };
