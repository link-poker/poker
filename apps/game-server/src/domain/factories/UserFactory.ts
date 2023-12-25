import { User } from '../entities/User';
import { Ulid } from '../value-objects/Ulid';
import { UserStatus, UserStatusEnum } from '../value-objects/UserStatus';

export class UserFactory {
  create(name: string, stack: number): User {
    const id = Ulid.create();
    const status = new UserStatus(UserStatusEnum.ACTIVE);
    return new User(id, name, stack, status, new Date(), new Date());
  }
}
