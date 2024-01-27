import { ENV_CONFIG } from '../configs/env';

const HTTP_BASE_URL = ENV_CONFIG.GAME_SERVER_HTTP_URL;
const WS_BASE_URL = ENV_CONFIG.GAME_SERVER_WS_URL;

export const getHealthUrl = () => {
  return `${HTTP_BASE_URL}/health`;
};

export const getCreateTableAsUserUrl = () => {
  return `${HTTP_BASE_URL}/tables`;
};

export const getCreateTableAsGuestUrl = () => {
  return `${HTTP_BASE_URL}/tables/guest`;
};

export const getSitDownAsUserUrl = (tableId: string) => {
  return `${HTTP_BASE_URL}/tables/${tableId}/sit-down`;
};

export const getSitDownAsGuestUrl = (tableId: string) => {
  return `${HTTP_BASE_URL}/tables/${tableId}/sit-down/guest`;
};

export const getTableWsUrl = (tableId: string, userId: string) => {
  return `${WS_BASE_URL}/ws/table/${tableId}/user/${userId}`;
};

export const getWatchTableWsUrl = (tableId: string) => {
  return `${WS_BASE_URL}/ws/table/${tableId}/watch`;
};
