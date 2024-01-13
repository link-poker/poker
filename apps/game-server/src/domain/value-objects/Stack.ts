import { ValidationError } from '../../error';

export class Stack {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Stack.');
    }
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  equals(other: Stack): boolean {
    return this.value === other.value;
  }

  private isValid(value: number): boolean {
    return value > 0;
  }
}
