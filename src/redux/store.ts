import { applyMiddleware,compose, createStore } from "redux";
import thunk from "redux-thunk";

import { WS_SIGN_URL, WS_URL } from "../utils/constants";
import { socketMiddleware, socketUserMiddleware } from "./middleware";
import rootReducer from "../redux/reducers";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk,
    socketMiddleware(WS_URL),
    socketUserMiddleware(WS_SIGN_URL)
  ));

export const store = createStore(rootReducer, enhancer);
