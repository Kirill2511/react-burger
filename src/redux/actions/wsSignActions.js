import {
  WS_SIGN_CONNECTION_START,
  WS_SIGN_CONNECTION_SUCCESS,
  WS_SIGN_CONNECTION_ERROR,
  WS_SIGN_CONNECTION_CLOSED,
  WS_SIGN_GET_MESSAGE,
  WS_SIGN_CONNECTION_STOP,
} from "../action-types";

const wsSignInit = () => {
  return {
    type: WS_SIGN_CONNECTION_START,
  };
};

const wsSignClose = () => {
  return {
    type: WS_SIGN_CONNECTION_STOP,
  };
};

const wsSignConnectionSuccess = () => {
  return {
    type: WS_SIGN_CONNECTION_SUCCESS,
  };
};

const wsSignConnectionError = (error) => {
  return {
    type: WS_SIGN_CONNECTION_ERROR,
    payload: error,
  };
};

const wsSignConnectionClosed = () => {
  return {
    type: WS_SIGN_CONNECTION_CLOSED,
  };
};

const wsSignGetMessage = (data) => {
  return {
    type: WS_SIGN_GET_MESSAGE,
    payload: data,
  };
};

export {
  wsSignConnectionSuccess,
  wsSignConnectionError,
  wsSignConnectionClosed,
  wsSignGetMessage,
  wsSignInit,
  wsSignClose,
};
