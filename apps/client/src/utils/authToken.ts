const AUTH_TOKEN_KEY = 'auth_token';

export const setAuthToken = (auth_token: string) => {
  sessionStorage.setItem(AUTH_TOKEN_KEY, auth_token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
};

export const removeAuthToken = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
};
