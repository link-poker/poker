import { User } from '../entities/User';
import { Ulid } from '../value-objects/Ulid';
import { UserName } from '../value-objects/UserName';
import { UserStatus } from '../value-objects/UserStatus';

export class UserFactory {
  static create(userName: UserName): User {
    const id = Ulid.create();
    const status = new UserStatus('ACTIVE');
    return new User(id, userName, status, new Date(), new Date());
  }
}
