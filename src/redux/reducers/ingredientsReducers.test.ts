import * as mocks from "../../utils/mock";
import * as actionsTypes from "../action-types";
import * as actions from "../actions";
import { TIngredientsActions } from "../actions";
import { ingredientsReducer as reducer, initialState } from "./ingredientsReducers";

describe("audit ingredientsReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as TIngredientsActions)).toEqual(initialState);
  });

  it(`should handle get items request success - ${actionsTypes.GET_INGREDIENTS_SUCCESS}`, () => {
    expect(reducer(initialState, actions.getIngredientsSuccess(mocks.dataTIngredientFillers))).toEqual({
      ...initialState,
      data: mocks.dataTIngredientFillers,
    });
  });

  it(`should handle get items request - ${actionsTypes.GET_INGREDIENTS_REQUEST}`, () => {
    expect(reducer(initialState, actions.getIngredientsRequest())).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it(`should handle get item request failure - ${actionsTypes.GET_INGREDIENTS_FAILED}`, () => {
    expect(reducer(initialState, actions.getIngredientsFailed())).toEqual({
      ...initialState,
      fetchingFailed: true,
      isFetching: false,
    });
  });
});
