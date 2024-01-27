import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_CONFIG } from '../../config/authToken';
import { User } from '../entities/User';
import { AuthorizationError } from '../../error';
import { AuthToken } from './AuthToken';
import { Ulid } from './Ulid';
import { UserName } from './UserName';
import { UserStatus } from './UserStatus';

export class AuthTokenValidator {
  private readonly secretKeyBase64: string;

  constructor(secretKeyBase64: string) {
    this.secretKeyBase64 = secretKeyBase64;
  }

  validate(authToken: AuthToken): User {
    let validatedUser: any;
    try {
      const secretKey = Buffer.from(this.secretKeyBase64, 'base64').toString();
      const payload = jwt.verify(authToken.get(), secretKey, { algorithms: AUTH_TOKEN_CONFIG.VALIDATE_ALGORITHMS });
      validatedUser = (payload as any).user;
      console.log(validatedUser);
    } catch (error) {
      throw new AuthorizationError('Invalid authToken');
    }
    return new User(
      new Ulid(validatedUser.id.value),
      new UserName(validatedUser.name.value),
      new UserStatus(validatedUser.status.value),
      new Date(validatedUser.createdAt),
      new Date(validatedUser.updatedAt),
    );
  }
}
