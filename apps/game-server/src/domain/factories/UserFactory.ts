import { User } from '../entities/User';
import { Ulid } from '../value-objects/Ulid';
import { UserName } from '../value-objects/UserName';
import { UserStatus, UserStatusEnum } from '../value-objects/UserStatus';

export class UserFactory {
  create(userName: UserName): User {
    const id = Ulid.create();
    const status = new UserStatus(UserStatusEnum.ACTIVE);
    return new User(id, userName, status, new Date(), new Date());
  }
}
