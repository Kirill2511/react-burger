import Cookies from "js-cookie";

import { postRefreshTokenRequest } from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const setToken = ({ accessToken, refreshToken }) => {
  const bearerToken = accessToken.includes("Bearer") ? accessToken.split(" ")[1] : accessToken;
  Cookies.set(ACCESS_TOKEN, bearerToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

const getToken = () => Cookies.get(ACCESS_TOKEN);

const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

const clearToken = () => {
  Cookies.remove(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const refreshToken = (afterRefresh) => (dispatch) => {
  postRefreshTokenRequest(localStorage.getItem(REFRESH_TOKEN))
    .then((response) => (response.ok ? response.json() : Promise.reject(`api err: ${response.status}`)))
    .then((result) => {
      setToken({ accessToken: result.accessToken, refreshToken: result.refreshToken });
      dispatch(afterRefresh);
    })
    .catch((e) => {
      console.log(e);
    });
};

export { clearToken, getRefreshToken, getToken, refreshToken, setToken };
