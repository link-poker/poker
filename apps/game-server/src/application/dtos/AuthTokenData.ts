import { IAuthTokenResponse } from '@link-poker/constants';
import { AuthToken } from '../../domain/value-objects/AuthToken';

export class AuthTokenData implements IAuthTokenResponse {
  authToken: string;

  constructor(authToken: AuthToken) {
    this.authToken = authToken.get();
  }
}
