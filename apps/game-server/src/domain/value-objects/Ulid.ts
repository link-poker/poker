import { z } from 'zod';
import { ulid } from 'ulid';
import { ValidationError } from '../../error';

export class Ulid {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid ulid format.');
    }
    this.value = value;
  }

  static create(): Ulid {
    return new Ulid(ulid());
  }

  get(): string {
    return this.value;
  }

  equals(other: Ulid): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.string().ulid().safeParse(value).success;
  }
}
