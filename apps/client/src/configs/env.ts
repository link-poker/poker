const ensureNotUndefined = (value: string | undefined): string => {
  if (value === undefined) throw new Error('Missing environment variable');
  return value;
};

export const ENV_CONFIG = {
  GAME_SERVER_BASE_URL: ensureNotUndefined(process.env.NEXT_PUBLIC_GAME_SERVER_BASE_URL),
};
