import { User } from '../../domain/entities/User';
import { UserFactory } from '../../domain/factories/UserFactory';
import { SeatNumber } from '../../domain/value-objects/SeatNumber';
import { Stack } from '../../domain/value-objects/Stack';
import { UserName } from '../../domain/value-objects/UserName';
import { IUserRepository } from '../../infrastructure/interfaces/IUserRepository';

export class UserApplicationService {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(userNameStr: string, stackNum: number, seatNumberNum: number): Promise<User> {
    const userName = new UserName(userNameStr);
    const stack = new Stack(stackNum);
    const seatNumber = new SeatNumber(seatNumberNum);
    const user = this.userFactory.create(userName, stack, seatNumber);
    await this.userRepository.create(user);
    return user;
  }
}
