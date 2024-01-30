const AUTH_INFO_KEY = 'auth_info';

export const setAuthInfo = (authInfo: AuthInfo) => {
  const authInfoStr = JSON.stringify(authInfo);
  sessionStorage.setItem(AUTH_INFO_KEY, authInfoStr);
};

export const getAuthInfo = (): AuthInfo | null => {
  const authInfoStr = sessionStorage.getItem(AUTH_INFO_KEY);
  if (!authInfoStr) {
    return null;
  }
  return JSON.parse(authInfoStr) as AuthInfo;
};

export const removeAuthInfo = () => {
  sessionStorage.removeItem(AUTH_INFO_KEY);
};
