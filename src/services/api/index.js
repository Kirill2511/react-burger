const API_LINK = 'https://norma.nomoreparties.space/api'
const API_LINK_AUTH = `${API_LINK}/auth`;

export const API_LINK_INGREDIENTS = `${API_LINK}/ingredients`;
export const API_LINK_ORDERS = `${API_LINK}/orders`;

export const API_LINK_PASSWORD_RESET = `${API_LINK}/password-reset`; // POST эндпоинт для сброса пароля
export const API_LINK_PASSWORD_UPDATE = `${API_LINK_PASSWORD_RESET}/reset`; // POST эндпоинт для создания нового пароля

export const API_LINK_REGISTER = `${API_LINK_AUTH}/register`; // POST эндпоинт для регистрации пользователя
export const API_LINK_LOGIN = `${API_LINK_AUTH}/login`; // POST эндпоинт для авторизации
export const API_LINK_LOGOUT = `${API_LINK_AUTH}/logout`; // POST эндпоинт для выхода из системы
export const API_LINK_TOKEN = `${API_LINK_AUTH}/token`; // POST эндпоинт обновления токена

// GET эндпоинт получения данных о пользователе
// PATCH эндпоинт обновления данных о пользователе
export const API_LINK_USER = `${API_LINK_AUTH}/user`;
