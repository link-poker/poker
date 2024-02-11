import jwt from 'jsonwebtoken';

export const AUTH_TOKEN_CONFIG: {
  EXPIRATION: string;
  ALGORITHM: jwt.Algorithm;
  VALIDATE_ALGORITHMS: jwt.Algorithm[];
} = {
  EXPIRATION: '7d',
  ALGORITHM: 'HS256',
  VALIDATE_ALGORITHMS: ['HS256'],
};
