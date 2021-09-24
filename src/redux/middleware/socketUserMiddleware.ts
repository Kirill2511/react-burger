import { Middleware, MiddlewareAPI } from "redux";

import { getToken } from "../../utils/token";
import {
  WS_SIGN_CONNECTION_CLOSED,
  WS_SIGN_CONNECTION_ERROR,
  WS_SIGN_CONNECTION_START,
  WS_SIGN_CONNECTION_STOP,
  WS_SIGN_CONNECTION_SUCCESS,
  WS_SIGN_GET_MESSAGE,
  WS_SIGN_SEND_MESSAGE,
} from "../action-types";
import { wsSignConnectionError } from "../actions";

export const socketUserMiddleware =
  (wsUrl: string): Middleware =>
  (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const accessToken = getToken();

      if (type === WS_SIGN_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (type === WS_SIGN_CONNECTION_STOP) {
        socket.close(1000, "Page closed by user");
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: WS_SIGN_CONNECTION_SUCCESS,
            payload: event,
          });
        };

        socket.onerror = (event) => {
          dispatch({
            type: WS_SIGN_CONNECTION_ERROR,
            payload: event,
          });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          if (data?.includes("ping")) {
            socket.send("pong");
          }
          const { success, message, orders, total, totalToday } = JSON.parse(data);
          if (success) {
            dispatch({
              type: WS_SIGN_GET_MESSAGE,
              payload: {
                orders,
                total,
                totalToday,
              },
            });
          } else {
            message && dispatch(wsSignConnectionError(message));
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_SIGN_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SIGN_SEND_MESSAGE) {
          socket.send(JSON.stringify(payload));
        }
      }
      next(action);
    };
  };
