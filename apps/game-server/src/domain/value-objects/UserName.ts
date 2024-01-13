import { z } from 'zod';
import { ValidationError } from '../../error';

export class UserName {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid User Name.');
    }
    this.value = value;
  }

  get(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.string().min(1).safeParse(value).success;
  }
}
