import { z } from 'zod';
import { ValidationError } from '../../error';

export class CurrentBet {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Current Bet.');
    }
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  equals(other: CurrentBet): boolean {
    return this.value === other.value;
  }

  private isValid(value: number): boolean {
    return z.number().min(0).safeParse(value).success;
  }
}
