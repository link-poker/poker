import { User } from '../entities/User';
import { SeatNumber } from '../value-objects/SeatNumber';
import { Stack } from '../value-objects/Stack';
import { Ulid } from '../value-objects/Ulid';
import { UserName } from '../value-objects/UserName';
import { UserStatus, UserStatusEnum } from '../value-objects/UserStatus';

export class UserFactory {
  create(name: UserName, stack: Stack, seatNumber: SeatNumber): User {
    const id = Ulid.create();
    const status = new UserStatus(UserStatusEnum.ACTIVE);
    return new User(id, name, stack, seatNumber, status, new Date(), new Date());
  }
}
