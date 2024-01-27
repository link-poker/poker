import { ENV_CONFIG } from '../configs/env';

const HTTP_BASE_URL = ENV_CONFIG.GAME_SERVER_HTTP_URL;
const WS_BASE_URL = ENV_CONFIG.GAME_SERVER_WS_URL;

export const getHealthPath = () => {
  return `${HTTP_BASE_URL}/health`;
};

export const getCreateTableAsUserPath = () => {
  return `${HTTP_BASE_URL}/tables`;
};

export const getCreateTableAsGuestPath = () => {
  return `${HTTP_BASE_URL}/tables/guest`;
};

export const getSitDownAsUserPath = (tableId: string) => {
  return `${HTTP_BASE_URL}/tables/${tableId}/sit-down`;
};

export const getSitDownAsGuestPath = (tableId: string) => {
  return `${HTTP_BASE_URL}/tables/${tableId}/sit-down/guest`;
};

export const getTableWsPath = (tableId: string, userId: string) => {
  return `${WS_BASE_URL}/ws/table/${tableId}/user/${userId}`;
};
