import { Ulid } from '../value-objects/Ulid';
import { UserStatus } from '../value-objects/UserStatus';

export class User {
  constructor(
    public readonly id: Ulid,
    public readonly name: string,
    public readonly stack: number,
    public readonly status: UserStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
