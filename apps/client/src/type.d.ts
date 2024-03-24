type ResponseState<T> = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  response?: T;
};

type AuthInfo = {
  userId: string;
  authToken: string;
};
