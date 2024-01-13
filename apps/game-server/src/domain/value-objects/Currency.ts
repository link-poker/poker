import { ValidationError } from '../../error';

export enum CurrencyEnum {
  USDT = 'USDT',
  POTATO = 'POTATO',
}

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
    return Object.values(CurrencyEnum).includes(value as CurrencyEnum);
  }
}
