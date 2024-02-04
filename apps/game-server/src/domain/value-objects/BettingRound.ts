import { ValidationError } from '../../error';

export enum BettingRoundEnum {
  PRE_FLOP = 'pre-flop',
  FLOP = 'flop',
  TURN = 'turn',
  RIVER = 'river',
}

export class BettingRound {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid BettingRound');
    }
    this.value = value;
  }

  get(): string {
    return this.value;
  }

  equals(other: BettingRound): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return Object.values(BettingRoundEnum).includes(value as BettingRoundEnum);
  }
}
