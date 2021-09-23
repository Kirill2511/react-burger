import { combineReducers } from "redux";

import { constructorReducer } from "./constructorReducers";
import { ingredientsReducer } from "./ingredientsReducers";
import { orderReducer } from "./orderReducers";
import { signReduser } from "./signReducers";
import { viewedItemReducer } from "./viewedItemReducers";
import { viewedOrderReducer } from "./viewedOrderReducers";
import { wsAllReducer } from "./wsAllReducers";
import { wsSignReducer } from "./wsSignReducers";

const rootReducer = combineReducers({
  cart: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  viewedItem: viewedItemReducer,
  sign: signReduser,
  wsAll: wsAllReducer,
  wsSign: wsSignReducer,
  viewedOrder: viewedOrderReducer,
});

export default rootReducer;
