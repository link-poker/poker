import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_CONFIG } from '../../config/authToken';
import { User } from '../entities/User';
import { AuthToken } from './AuthToken';

export class AuthTokenGenerator {
  private readonly secretKeyBase64: string;

  // how to generate a secret key by openssl:
  // $ openssl rand -base64 32
  constructor(secretKeyBase64: string) {
    this.secretKeyBase64 = secretKeyBase64;
  }

  generate(user: User): AuthToken {
    const secretKey = Buffer.from(this.secretKeyBase64, 'base64').toString();
    const authToken = jwt.sign({ user }, secretKey, {
      expiresIn: AUTH_TOKEN_CONFIG.EXPIRATION,
      algorithm: AUTH_TOKEN_CONFIG.ALGORITHM,
    });
    return new AuthToken(authToken);
  }
}
