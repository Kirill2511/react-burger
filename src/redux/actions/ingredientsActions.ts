import { apiGetIngredientsRequest } from "../../utils/api";
import dataEmpty from "../../utils/mock/data-mock-empty";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../action-types";
import type { TIngredient } from "../types/data";
import { AppDispatch, AppThunk } from "../types/redux";
import { addConstructorIngredient } from ".";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredient>;
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = IGetIngredientsFailed | IGetIngredientsSuccess | IGetIngredientsRequest;

export const getIngredientsRequest = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (data: Array<TIngredient>): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
});

export const getIngredientsFailed = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED,
});

export const getIngredients: AppThunk = () =>
  function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    apiGetIngredientsRequest()
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        dispatch(getIngredientsSuccess(result.data));

        dispatch(addConstructorIngredient(dataEmpty.find((item) => item.type === "empty") as TIngredient));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getIngredientsFailed());
      });
  };
