import { ValidationError } from '../../error';

export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

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
    return Object.values(UserStatusEnum).includes(value as UserStatusEnum);
  }
}
