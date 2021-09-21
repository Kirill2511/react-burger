import { addConstructorIngredient } from "./constructorActions";
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../action-types";
import { apiGetIngredientsRequest } from "../../utils/api";
import dataEmpty from "../../utils/mock/data-mock-empty";

export const getIngredientsRequest = () => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (data) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
});

export const getIngredientsFailed = () => ({
  type: GET_INGREDIENTS_FAILED,
});

export function getIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    apiGetIngredientsRequest()
      .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
      .then((result) => {
        dispatch(getIngredientsSuccess(result.data));

        dispatch(addConstructorIngredient(dataEmpty.find((item) => item.type === "empty")));
      })
      .catch((e) => {
        console.log(e);
        dispatch(getIngredientsFailed());
      });
  };
}
