import { ENV_CONFIG } from '../../config/env';
import { User } from '../../domain/entities/User';
import { UserFactory } from '../../domain/factories/UserFactory';
import { AuthToken } from '../../domain/value-objects/AuthToken';
import { AuthTokenGenerator } from '../../domain/value-objects/AuthTokenGenerator';
import { UserName } from '../../domain/value-objects/UserName';
import { IUserRepository } from '../../interfaces/repository/IUserRepository';

export class UserApplicationService {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(userNameStr: string): Promise<{ user: User; authToken: AuthToken }> {
    const userName = new UserName(userNameStr);
    const user = this.userFactory.create(userName);
    await this.userRepository.create(user);
    const authTokenGenerator = new AuthTokenGenerator(ENV_CONFIG.AUTH_TOKEN_SECRET_KEY_BASE64);
    const authToken = authTokenGenerator.generate(user);
    return { user, authToken };
  }
}
