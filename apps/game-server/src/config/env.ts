import * as dotenv from 'dotenv';
dotenv.config();

const ensureNotUndefined = (value: string | undefined): string => {
  if (value === undefined) throw new Error('Missing environment variable');
  return value;
};

export const ENV_CONFIG = {
  AUTH_TOKEN_SECRET_KEY_BASE64: ensureNotUndefined(process.env.AUTH_TOKEN_SECRET_KEY_BASE64),
};
