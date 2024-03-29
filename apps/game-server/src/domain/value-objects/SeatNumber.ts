import { z } from 'zod';
import { ValidationError } from '../../error';

export class SeatNumber {
  private readonly value: number;
  private static readonly maxSeat = 9;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid seat number format.');
    }
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  equals(other: SeatNumber): boolean {
    return this.value === other.value;
  }

  private isValid(value: number): boolean {
    return z.number().int().min(0).max(SeatNumber.maxSeat).safeParse(value).success;
  }
}
