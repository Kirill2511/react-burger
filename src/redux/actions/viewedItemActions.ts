import { RESET_VIEW_ITEM, SET_VIEW_ITEM } from "../action-types";
import type { TIngredient } from "../types/data";

export interface ISetViewItem {
  readonly type: typeof SET_VIEW_ITEM;
  readonly payload: TIngredient;
}
export interface IResetViewItem {
  readonly type: typeof RESET_VIEW_ITEM;
}

export type TViewedItemActions = ISetViewItem | IResetViewItem;

export const setViewItem = (data: TIngredient): TViewedItemActions => ({
  type: SET_VIEW_ITEM,
  payload: data,
});

export const resetViewItem = (): TViewedItemActions => ({
  type: RESET_VIEW_ITEM,
});
