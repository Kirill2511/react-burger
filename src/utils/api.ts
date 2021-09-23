import { API_URL } from "../utils/constants";
import type {
  TSignDataWPassword,
  TSignDataForgoutPassword,
  TSignDataLogin,
  TSignDataLogResetPassword,
  TId,
} from "../redux/types/data";

const headers = {
  post: { "Content-Type": "application/json" },
  get: {},
};

export const apiGetIngredientsRequest = async () => await fetch(`${API_URL}/ingredients`);

export const checkoutRequest = async (idOrderIngredients: Array<TId>, token: string) =>
  await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { ...headers.post, authorization: `Bearer ${token}` },
    body: JSON.stringify({ ingredients: idOrderIngredients }),
  });

export const postRegisterRequest = async (data: TSignDataWPassword) =>
  await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: headers.post,
    body: JSON.stringify({ ...data }),
  });

export const postLoginRequest = async (data: TSignDataLogin) =>
  await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: headers.post,
    body: JSON.stringify({ ...data }),
  });

export const postRefreshTokenRequest = async (token: string) =>
  await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: headers.post,
    body: JSON.stringify({ token }),
  });

export const postLogoutRequest = async (token: string) =>
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: headers.post,
    body: JSON.stringify({ token }),
  });

export const patchProfileRequest = async (data: TSignDataWPassword, token: string) =>
  await fetch(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: { ...headers.post, authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...data }),
  });

export const apiGetProfileRequest = async (token: string) =>
  await fetch(`${API_URL}/auth/user`, {
    method: "GET",
    headers: { ...headers.get, authorization: `Bearer ${token}` },
  });

export const postForgotPasswordRequest = async (data: TSignDataForgoutPassword) =>
  await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: { ...headers.post },
    body: JSON.stringify({ ...data }),
  });

export const postResetPasswordRequest = async (data: TSignDataLogResetPassword) =>
  await fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: { ...headers.post },
    body: JSON.stringify({ ...data }),
  });

export const getOrderDetailsRequest = async (id: TId) => {
  return await fetch(`${API_URL}/orders/${id}`, {
    method: "GET",
    headers: { ...headers.get },
  });
};
