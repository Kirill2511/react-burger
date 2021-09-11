import { combineReducers } from "redux";

import { dataReducer } from "./dataReducer";
import { modalDataReducer } from "./modalDataReducer";
import { modalIngredientsReducer } from "./modalIngredientsReducer";
import { modalOrderReducer } from "./modalOrderReducer";
import { orderReducer } from "./orderReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  order: orderReducer,
  modalData: modalDataReducer,
  modalOrder: modalOrderReducer,
  modalIngredients: modalIngredientsReducer,
});

export default rootReducer;
