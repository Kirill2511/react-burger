import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { WS_SIGN_URL, WS_URL } from "../utils/constants";
import rootReducer from "./reducers";
import { socketMiddleware, socketUserMiddleware } from "../redux/middleware";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(WS_URL)),
  applyMiddleware(socketUserMiddleware(WS_SIGN_URL))
);

export const store = createStore(rootReducer, enhancer);
