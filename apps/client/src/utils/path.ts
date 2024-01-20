import { ENV_CONFIG } from '../configs/env';

const BASE_URL = ENV_CONFIG.GAME_SERVER_BASE_URL;

export const getHealthPath = () => {
  return `${BASE_URL}/health`;
};

export const getCreateTableAsUserPath = () => {
  return `${BASE_URL}/tables`;
};

export const getCreateTableAsGuestPath = () => {
  return `${BASE_URL}/tables/guest`;
};

export const getSitDownAsUserPath = (tableId: string) => {
  return `${BASE_URL}/tables/${tableId}/sit-down`;
};

export const getSitDownAsGuestPath = (tableId: string) => {
  return `${BASE_URL}/tables/${tableId}/sit-down/guest`;
};

export const getTableWsPath = (tableId: string, userId: string) => {
  return `${BASE_URL}/ws/table/${tableId}/user/${userId}`;
};
