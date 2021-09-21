import * as mocks from "../../utils/mock";
import * as actionsTypes from "../action-types";
import * as actions from "../actions";
import { constructorReducer as reducer, initialState } from "./constructorReducers";

describe("audit constructorReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle add item - ${actionsTypes.ADD_CONSTRUCTOR_INGREDIENT}`, () => {
    expect(reducer(initialState, actions.addConstructorIngredient(mocks.dataIngredientEmpty))).toEqual({
      ...initialState,
      data: [mocks.dataIngredientEmpty],
      sortedData: {
        ...initialState.sortedData,
        empty: mocks.dataIngredientEmpty,
      },
    });
  });

  it(`should handle remove item - ${actionsTypes.DELETE_CONSTRUCTOR_INGREDIENT}`, () => {
    const payload = 1;
    expect(
      reducer(
        {
          ...initialState,
          sortedData: {
            ...initialState.sortedData,
            fillers: mocks.dataTIngredientFillers,
          },
        },
        actions.deleteConstructorIngredient(payload)
      )
    ).toEqual({
      ...initialState,
      sortedData: {
        ...initialState.sortedData,
        fillers: mocks.dataTIngredientFillers.filter((_, indx) => payload !== indx),
      },
    });
  });

  it(`should handle clear all item - ${actionsTypes.RESET_CONSTRUCTOR}`, () => {
    expect(
      reducer(
        {
          ...initialState,
          sortedData: {
            ...initialState.sortedData,
            fillers: mocks.dataTIngredientFillers,
          },
        },
        actions.resetConstructor()
      )
    ).toEqual(initialState);
  });

  it(`should handle swap items - ${actionsTypes.SWAP_CONSTRUCTOR_INGREDIENT}`, () => {
    const dragIndex = 1;
    const hoverIndex = 2;
    expect(
      reducer(
        {
          ...initialState,
          sortedData: {
            ...initialState.sortedData,
            fillers: mocks.dataTIngredientFillers,
          },
        },
        actions.swapConstructorIngredient(dragIndex, hoverIndex)
      )
    ).toEqual({
      ...initialState,
      sortedData: {
        ...initialState.sortedData,
        fillers: [
          mocks.dataTIngredientFillers[0],
          mocks.dataTIngredientFillers[dragIndex],
          mocks.dataTIngredientFillers[hoverIndex],
        ],
      },
    });
  });
});
