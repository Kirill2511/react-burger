import { combineReducers } from 'redux';

import constructorReducer from './constructorReducer';
import ingredientsReducer from './ingredientsReducer';
import modalReducer from './modalReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: constructorReducer,
	order: orderReducer,
	modal: modalReducer,
});

export default rootReducer
