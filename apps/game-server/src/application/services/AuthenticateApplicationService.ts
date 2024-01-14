import { ENV_CONFIG } from '../../config/env';
import { User } from '../../domain/entities/User';
import { AuthToken } from '../../domain/value-objects/AuthToken';
import { TokenGenerator } from '../../domain/value-objects/TokenGenerator';
import { TokenValidator } from '../../domain/value-objects/TokenValidator';
import { IUserRepository } from '../../infrastructure/interfaces/IUserRepository';

export class AuthenticateApplicationService {
  constructor(private readonly userRepository: IUserRepository) {}
  async login(userId: string, password: string): Promise<AuthToken> {
    const user = await this.userRepository.findById(userId);
    // TODO: login logic with password
    const tokenGenerator = new TokenGenerator(ENV_CONFIG.AUTH_TOKEN_SECRET_KEY_BASE64);
    return tokenGenerator.generate(user);
  }

  authenticate(authTokenStr: string | undefined): User {
    const tokenValidator = new TokenValidator(ENV_CONFIG.AUTH_TOKEN_SECRET_KEY_BASE64);
    const authToken = AuthToken.init(authTokenStr);
    return tokenValidator.validate(authToken);
  }
}
