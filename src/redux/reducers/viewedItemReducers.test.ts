import * as mocks from "../../utils/mock";
import * as actionsTypes from "../action-types";
import * as actions from "../actions";
import { TViewedItemActions } from "../actions";
import { initialState, viewedItemReducer as reducer } from "./viewedItemReducers";

describe("audit viewedItemReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as TViewedItemActions)).toEqual(initialState);
  });

  it(`should handle set view item - ${actionsTypes.SET_VIEW_ITEM}`, () => {
    expect(reducer(initialState, actions.setViewItem(mocks.dataTIngredient))).toEqual({
      ...initialState,
      data: mocks.dataTIngredient,
    });
  });

  it(`should handle reset view item - ${actionsTypes.RESET_VIEW_ITEM}`, () => {
    expect(reducer(initialState, actions.resetViewItem())).toEqual({
      ...initialState,
    });
  });
});
