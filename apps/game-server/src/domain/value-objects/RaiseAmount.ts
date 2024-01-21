import { z } from 'zod';
import { ValidationError } from '../../error';

export class RaiseAmount {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid RaiseAmount.');
    }
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  equals(other: RaiseAmount): boolean {
    return this.value === other.value;
  }

  private isValid(value: number): boolean {
    return z.number().min(0).safeParse(value).success;
  }
}
