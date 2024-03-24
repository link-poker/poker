import { ENV_CONFIG } from '../../config/env';
import { User } from '../../domain/entities/User';
import { AuthToken } from '../../domain/value-objects/AuthToken';
import { AuthTokenGenerator } from '../../domain/value-objects/AuthTokenGenerator';
import { AuthTokenValidator } from '../../domain/value-objects/AuthTokenValidator';
import { Ulid } from '../../domain/value-objects/Ulid';
import { IUserRepository } from '../../interfaces/repository/IUserRepository';

export class AuthenticateApplicationService {
  constructor(private readonly userRepository: IUserRepository) {}
  async login(userIdStr: string, password: string): Promise<AuthToken> {
    const userId = new Ulid(userIdStr);
    const user = await this.userRepository.findById(userId);
    // TODO: login logic with password
    const tokenGenerator = new AuthTokenGenerator(ENV_CONFIG.AUTH_TOKEN_SECRET_KEY_BASE64);
    return tokenGenerator.generate(user);
  }

  authenticate(authTokenStr?: string): User {
    const tokenValidator = new AuthTokenValidator(ENV_CONFIG.AUTH_TOKEN_SECRET_KEY_BASE64);
    const authToken = AuthToken.init(authTokenStr);
    return tokenValidator.validate(authToken);
  }
}
