import { z } from 'zod';
import { ValidationError } from '../../error';

const BettingRoundList = ['PRE_FLOP', 'FLOP', 'TURN', 'RIVER'] as const;
type BettingRoundEnum = (typeof BettingRoundList)[number];

export class BettingRound {
  private readonly value: BettingRoundEnum;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid BettingRound');
    }
    this.value = value as BettingRoundEnum;
  }

  get(): BettingRoundEnum {
    return this.value;
  }

  equals(other: BettingRound): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.enum(BettingRoundList).safeParse(value).success;
  }
}
