import { AuthToken } from '../../domain/value-objects/AuthToken';
import { IAuthTokenResponse } from '../../interfaces/response/IAuthTokenResponse';

export class AuthTokenData implements IAuthTokenResponse {
  authToken: string;

  constructor(authToken: AuthToken) {
    this.authToken = authToken.get();
  }
}
