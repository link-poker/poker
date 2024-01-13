import { User } from '../../domain/entities/User';
import { UserFactory } from '../../domain/factories/UserFactory';
import { SeatNumber } from '../../domain/value-objects/SeatNumber';
import { IUserRepository } from '../../infrastructure/interfaces/IUserRepository';

export class UserApplicationService {
  constructor(private readonly userFactory: UserFactory, private readonly userRepository: IUserRepository) {}

  async createUser(name: string, stack: number, seatNumberNumber: number): Promise<User> {
    const seatNumber = new SeatNumber(seatNumberNumber);
    const user = this.userFactory.create(name, stack, seatNumber);
    await this.userRepository.create(user);
    return user;
  }
}
