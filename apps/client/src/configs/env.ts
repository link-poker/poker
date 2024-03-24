const ensureNotUndefined = (value?: string): string => {
  if (!value) throw new Error('Missing environment variable');
  return value;
};

export const ENV_CONFIG = {
  GAME_SERVER_HTTP_URL: ensureNotUndefined(process.env.NEXT_PUBLIC_GAME_SERVER_HTTP_URL),
  GAME_SERVER_WS_URL: ensureNotUndefined(process.env.NEXT_PUBLIC_GAME_SERVER_WS_URL),
};
