import { z } from 'zod';
import { ValidationError } from '../../error';

export class AuthToken {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Auth Token.');
    }
    this.value = value as string;
  }

  static init(authToken: string | undefined): AuthToken {
    if (!authToken) throw new ValidationError('Auth Token is required.');
    authToken = authToken.replace('Bearer ', '');
    return new AuthToken(authToken);
  }

  get(): string {
    return this.value;
  }

  equals(other: AuthToken): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.string().min(1).safeParse(value).success;
  }
}
