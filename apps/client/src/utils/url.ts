import { ENV_CONFIG } from '../configs/env';
import { getAuthInfo } from './authInfo';

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

export const getWsUrl = (tableId: string) => {
  const authInfo = getAuthInfo();
  if (authInfo) return getTableWsUrl(tableId, authInfo);
  else return getWatchTableWsUrl(tableId);
};

export const getTableWsUrl = (tableId: string, authInfo: AuthInfo) => {
  return `${GAME_SERVER_WS_URL}/ws/table/${tableId}/user/${authInfo.userId}?authToken=${authInfo.authToken}`;
};

export const getWatchTableWsUrl = (tableId: string) => {
  return `${GAME_SERVER_WS_URL}/ws/table/${tableId}/watch`;
};
