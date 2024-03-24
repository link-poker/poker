'use client';
import { useEffect } from 'react';
import { useUser } from 'hooks/useUser';
import { getAuthInfo } from 'utils/authInfo';

export default function User() {
  const { loadUser } = useUser();
  useEffect(() => {
    const authInfo = getAuthInfo();
    if (authInfo?.userId) {
      loadUser(authInfo.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
