import { CLOSE_DATA_MODAL, OPEN_DATA_MODAL } from "../actions/modalDataActions";

export const initialState = {
  currentIngredient: null,
  isModalDataOpened: false,
};

export const modalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DATA_MODAL:
      return {
        currentIngredient: action.data,
        isModalDataOpened: true,
      };

    case CLOSE_DATA_MODAL:
      return {
        currentIngredient: null,
        isModalDataOpened: false,
      };

    default:
      return state;
  }
};
