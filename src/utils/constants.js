const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

const API_URL = "https://norma.nomoreparties.space/api";
const WS_URL = "wss://norma.nomoreparties.space/orders/all";
const WS_SIGN_URL = "wss://norma.nomoreparties.space/orders";

const ITEM_DETAILS = {
  calories: "Калории, ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

const PROFILE_NAV_TEXT = {
  profile: "В этом разделе вы можете изменить свои персональные данные",
  orders: "В этом разделе вы можете просмотреть свою историю заказов",
};

const ORDER_STATUS = {
  done: "Выполнен",
  pending: "Готовиться",
  created: "Создан",
};

const ITEM_TYPE = {
  FILLERS: "fillers",
};

const INITIAL_FORM_LOGIN = {
  email: "",
  password: "",
};
const INITIAL_FORM_REGISTER = {
  name: "",
  email: "",
  password: "",
};
const INITIAL_FORM_RESET_PASSWD = {
  password: "",
  token: "",
};
const INITIAL_FORM_FORGOT_PASSWD = {
  email: "",
};

const INITIAL_FORM_PROFILE = {
  name: "",
  email: "",
  password: "",
};

export {
  ACCESS_TOKEN,
  API_URL,
  INITIAL_FORM_FORGOT_PASSWD,
  INITIAL_FORM_LOGIN,
  INITIAL_FORM_PROFILE,
  INITIAL_FORM_REGISTER,
  INITIAL_FORM_RESET_PASSWD,
  ITEM_DETAILS,
  ITEM_TYPE,
  ORDER_STATUS,
  PROFILE_NAV_TEXT,
  REFRESH_TOKEN,
  WS_SIGN_URL,
  WS_URL};
