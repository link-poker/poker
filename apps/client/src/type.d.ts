type ResponseState<T> = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  response: T | null;
};

type AuthInfo = {
  userId: string;
  authToken: string;
};
