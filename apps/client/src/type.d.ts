type ResponseState<T> = {
  status: 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';
  error?: string;
  response?: T;
};

type AuthInfo = {
  userId: string;
  authToken: string;
};
