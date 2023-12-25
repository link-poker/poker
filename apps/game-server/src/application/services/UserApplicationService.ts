import { User } from '../../domain/entities/User';
import { UserFactory } from '../../domain/factories/UserFactory';
import { IUserRepository } from '../../infrastructure/interfaces/IUserRepository';

export class UserApplicationService {
  constructor(private readonly userFactory: UserFactory, private readonly userRepository: IUserRepository) {}

  async createUser(name: string, stack: number): Promise<User> {
    const user = this.userFactory.create(name, stack);
    await this.userRepository.create(user);
    return user;
  }
}
