import { ENV_CONFIG } from '../configs/env';

const GAME_SERVER_HTTP_URL = ENV_CONFIG.GAME_SERVER_HTTP_URL;
const GAME_SERVER_WS_URL = ENV_CONFIG.GAME_SERVER_WS_URL;

export const getHealthUrl = () => {
  return `${GAME_SERVER_HTTP_URL}/health`;
};

export const getCreateTableAsUserUrl = () => {
  return `${GAME_SERVER_HTTP_URL}/tables`;
};

export const getCreateTableAsGuestUrl = () => {
  return `${GAME_SERVER_HTTP_URL}/tables/guest`;
};

export const getSitDownAsUserUrl = (tableId: string) => {
  return `${GAME_SERVER_HTTP_URL}/tables/${tableId}/sit-down`;
};

export const getSitDownAsGuestUrl = (tableId: string) => {
  return `${GAME_SERVER_HTTP_URL}/tables/${tableId}/sit-down/guest`;
};

export const getTableUrl = (tableId: string) => {
  return `${GAME_SERVER_HTTP_URL}/tables/${tableId}`;
};

export const getUserUrl = (userId: string) => {
  return `${GAME_SERVER_HTTP_URL}/users/${userId}`;
};

export const getTableWsUrl = (tableId: string, userId: string) => {
  return `${GAME_SERVER_WS_URL}/ws/table/${tableId}/user/${userId}`;
};

export const getWatchTableWsUrl = (tableId: string) => {
  return `${GAME_SERVER_WS_URL}/ws/table/${tableId}/watch`;
};
