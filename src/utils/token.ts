import Cookies from "js-cookie";

import { postRefreshTokenRequest } from "../utils/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import { TSignActions } from "../redux/actions";
import { AppDispatch } from "../redux/types";

interface IToken {
  accessToken: string;
  refreshToken: string;
}

const setToken = ({ accessToken, refreshToken }: IToken) => {
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

const refreshToken = (afterRefresh: TSignActions) => (dispatch: AppDispatch) => {
  postRefreshTokenRequest(localStorage.getItem(REFRESH_TOKEN) as string)
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
