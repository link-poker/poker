import { z } from 'zod';
import { ValidationError } from '../../error';

const UserStatusList = ['ACTIVE', 'INACTIVE'] as const;
type UserStatusEnum = (typeof UserStatusList)[number];

export class UserStatus {
  private readonly value: UserStatusEnum;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid User status.');
    }
    this.value = value as UserStatusEnum;
  }

  get(): string {
    return this.value;
  }

  equals(other: UserStatus): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.enum(UserStatusList).safeParse(value).success;
  }
}
