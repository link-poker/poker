import { User } from '../../domain/entities/User';
import { Ulid } from '../../domain/value-objects/Ulid';

export interface IUserRepository {
  findById(id: Ulid): Promise<User>;
  create(user: User): Promise<User>;
}
