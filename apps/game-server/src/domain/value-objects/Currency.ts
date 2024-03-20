import { z } from 'zod';
import { ValidationError } from '../../error';

const CurrencyList = ['USDT', 'POTATO'] as const;
type CurrencyEnum = (typeof CurrencyList)[number];

export class Currency {
  private readonly value: CurrencyEnum;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Currency.');
    }
    this.value = value as CurrencyEnum;
  }

  get(): string {
    return this.value;
  }

  equals(other: Currency): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.enum(CurrencyList).safeParse(value).success;
  }
}
