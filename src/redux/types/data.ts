export type TId = string | number;

export enum EItemType {
  "typeBun" = "bun",
  "typeSauce" = "sauce",
  "typeMain" = "main",
  "typeEmpty" = "empty",
}

export enum EOrderStatus {
  "done" = "Выполнен",
  "pending" = "Готовиться",
  "created" = "Создан",
  "cancel" = "Отменен",
}

export type TIngredient = {
  _id: TId;
  name: string;
  type: EItemType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TSortedIngredient = TIngredient & { index: number };
export type TGroupedIngredient = TIngredient & { count: number };

export type TOrder = {
  _id: TId;
  ingredients: ReadonlyArray<TId>;
  owner?: string | TOwner;
  status: keyof typeof EOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price?: number;
  __v?: number;
};

export type TViewedOrder = TOrder & {
  groupedIngredients: Array<TGroupedIngredient>;
  ingredientsWDetails: Array<TIngredient>;
  orderTotalPrice: number;
};

export type TOrderWS = Omit<TOrder, "owner" | "__v" | "price">;

export type TOrderWSAll = {
  orders: ReadonlyArray<TOrderWS>;
  total: number;
  totalToday: number;
};

export type TSignData = {
  name: string;
  email: string;
};
export type TSignDataWPassword = TSignData & {
  password?: string;
};
export type TSignDataForgoutPassword = Omit<TSignData, "name">;
export type TSignDataLogin = {
  email: string;
  password: string;
};
export type TSignDataLogResetPassword = {
  token: string;
  password: string;
};
export type TOwner = TSignData & {
  createdAt: string;
  updatedAt: string;
};
