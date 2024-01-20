import { User } from '../../domain/entities/User';
import { UserFactory } from '../../domain/factories/UserFactory';
import { UserName } from '../../domain/value-objects/UserName';
import { IUserRepository } from '../../interfaces/repository/IUserRepository';

export class UserApplicationService {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(userNameStr: string): Promise<User> {
    const userName = new UserName(userNameStr);
    const user = this.userFactory.create(userName);
    await this.userRepository.create(user);
    return user;
  }
}
