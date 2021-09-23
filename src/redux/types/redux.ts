import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import {
    TConstructorActions,
    TIngredientsActions,
    TOrderActions,
    TSignActions,
    TViewedItemActions,
    TViewedOrderActions,
    TWsAllActions,
    TWsSignActions
} from '../actions';


type TApplicationActions =
    | TConstructorActions
    | TIngredientsActions
    | TOrderActions
    | TSignActions
    | TViewedItemActions
    | TViewedOrderActions
    | TWsAllActions
    | TWsSignActions
    ;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
   ThunkAction<ReturnType, Action, RootState, TApplicationActions>
 >;
