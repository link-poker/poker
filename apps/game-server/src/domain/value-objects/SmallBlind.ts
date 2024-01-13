import { ValidationError } from '../../error';

export class SmallBlind {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Small Blind.');
    }
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  equals(other: SmallBlind): boolean {
    return this.value === other.value;
  }

  private isValid(value: number): boolean {
    return value > 0;
  }
}
