import { z } from 'zod';
import { ValidationError } from '../../error';

export class BuyIn {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Buy In.');
    }
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  equals(other: BuyIn): boolean {
    return this.value === other.value;
  }

  private isValid(value: number): boolean {
    return z.number().min(0).safeParse(value).success;
  }
}
