import { RESET_VIEW_ITEM, SET_VIEW_ITEM } from "../action-types";
import type { TViewedItemActions } from "../actions";
import type { TIngredient } from "../types/data";

type TViewedItemState = {
  data: TIngredient;
  lastUpdated: number | null;
};

export const initialState: TViewedItemState = {
  data: {} as TIngredient,
  lastUpdated: null,
};

export const viewedItemReducer = (state = initialState, action: TViewedItemActions): TViewedItemState => {
  switch (action.type) {
    case SET_VIEW_ITEM: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case RESET_VIEW_ITEM: {
      return {
        ...state,
        data: initialState.data,
      };
    }

    default: {
      return state;
    }
  }
};
