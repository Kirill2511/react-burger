import {
  GET_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR,
  SWAP_CONSTRUCTOR_INGREDIENT,
} from "../action-types";

export const deleteConstructorIngredient = (id) => ({
  type: DELETE_CONSTRUCTOR_INGREDIENT,
  payload: id,
});

export const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR,
});

export const addConstructorIngredient = (payload) => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload,
});

export const swapConstructorIngredient = (dragIndex, hoverIndex) => ({
  type: SWAP_CONSTRUCTOR_INGREDIENT,
  payload: { dragIndex, hoverIndex },
});
