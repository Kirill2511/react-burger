import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducers";
import { constructorReducer } from "./constructorReducers";
import { orderReducer } from "./orderReducers";
import { viewedItemReducer } from "./viewedItemReducers";
import { signReduser } from "./signReducers";
import { wsAllReducer } from "./wsAllReducers";
import { wsSignReducer } from "./wsSignReducers";
import { viewedOrderReducer } from "./viewedOrderReducers";

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
