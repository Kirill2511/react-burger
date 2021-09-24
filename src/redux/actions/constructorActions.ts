import {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  GET_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR,
  SWAP_CONSTRUCTOR_INGREDIENT,
} from "../action-types";
import type { TId, TIngredient } from "../types/data";

export interface IAddConstructorIngredient {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  readonly payload: TIngredient;
}

export interface IDeleteConstructorIngredient {
  readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  readonly payload: number;
}

export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export interface IGetConstructorIngredient {
  readonly type: typeof GET_CONSTRUCTOR_INGREDIENT;
  readonly payload: Array<TIngredient>;
}

export interface ISwapConstructorIngredient {
  readonly type: typeof SWAP_CONSTRUCTOR_INGREDIENT;
  readonly payload: {
    dragIndex: number;
    hoverIndex: number;
  };
}

export type TConstructorActions =
  | ISwapConstructorIngredient
  | IResetConstructor
  | IDeleteConstructorIngredient
  | IAddConstructorIngredient
  | IGetConstructorIngredient;

export const deleteConstructorIngredient = (id: number): IDeleteConstructorIngredient => ({
  type: DELETE_CONSTRUCTOR_INGREDIENT,
  payload: id,
});

export const resetConstructor = (): IResetConstructor => ({
  type: RESET_CONSTRUCTOR,
});

export const addConstructorIngredient = (payload: TIngredient): IAddConstructorIngredient => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload,
});

export const swapConstructorIngredient = (dragIndex: number, hoverIndex: number): ISwapConstructorIngredient => ({
  type: SWAP_CONSTRUCTOR_INGREDIENT,
  payload: { dragIndex, hoverIndex },
});
