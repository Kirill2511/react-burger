export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openIngredientModal = () => (dispatch) =>
  dispatch({ type: OPEN_INGREDIENT_MODAL });

export const openOrderModal = () => (dispatch) =>
  dispatch({ type: OPEN_ORDER_MODAL });

export const closeModal = () => (dispatch) => dispatch({ type: CLOSE_MODAL });
