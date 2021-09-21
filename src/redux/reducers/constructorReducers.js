import {
  GET_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR,
  SWAP_CONSTRUCTOR_INGREDIENT,
} from "../action-types";

export const initialState = {
  data: [],
  sortedData: {
    bun: {},
    fillers: [],
    empty: {},
  },

  total: 0,
  lastUpdated: null
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      let sortedData = { ...state.sortedData };
      if (action.payload.type === "empty") {
        sortedData = { ...sortedData, empty: action.payload };
      } else if (action.payload.type === "bun") {
        sortedData = { ...sortedData, bun: action.payload };
      } else {
        sortedData = { ...sortedData, fillers: [...sortedData.fillers, action.payload] };
      }
      return {
        ...state,
        data: [...state.data, action.payload],
        sortedData,
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      const sortedData = { ...state.sortedData };
      sortedData.fillers = sortedData.fillers.filter((item, indx) => action.payload !== indx);
      return {
        ...state,
        sortedData,
      };
    }
    case SWAP_CONSTRUCTOR_INGREDIENT: {
      const { dragIndex, hoverIndex } = action.payload;
      const sortedData = { ...state.sortedData };
      sortedData.fillers[dragIndex] = sortedData.fillers.splice(hoverIndex, 1, sortedData.fillers[dragIndex])[0];
      return {
        ...state,
        sortedData,
      };
    }

    case GET_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }
    case RESET_CONSTRUCTOR: {
      return initialState ;
    }

    default: {
      return state;
    }
  }
};
