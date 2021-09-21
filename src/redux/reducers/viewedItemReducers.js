import { SET_VIEW_ITEM, RESET_VIEW_ITEM } from "../action-types";

const initialState = {
  data: {},
};

export const viewedItemReducer = (state = initialState, action) => {
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
