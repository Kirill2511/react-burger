import { CLOSE_FEED_MODAL, OPEN_FEED_MODAL } from "../actions/modalIngredientsActions";

export const initialState = {
  isModalFeedOpened: false,
};

export const modalIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_FEED_MODAL:
      return {
        isModalFeedOpened: true,
      };

    case CLOSE_FEED_MODAL:
      return {
        isModalFeedOpened: false,
      };

    default:
      return state;
  }
};
