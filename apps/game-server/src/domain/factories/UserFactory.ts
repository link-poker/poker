import { User } from '../entities/User';
import { SeatNumber } from '../value-objects/SeatNumber';
import { Ulid } from '../value-objects/Ulid';
import { UserStatus, UserStatusEnum } from '../value-objects/UserStatus';

export class UserFactory {
  create(name: string, stack: number, seatNumber: SeatNumber): User {
    const id = Ulid.create();
    const status = new UserStatus(UserStatusEnum.ACTIVE);
    return new User(id, name, stack, seatNumber, status, new Date(), new Date());
  }
}
