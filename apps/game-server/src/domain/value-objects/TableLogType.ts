import { ValidationError } from '../../error';

export enum TableLogTypeEnum {
  STARTING_HAND = 'startingHand',
  STACK = 'stack',
  YOUR_HAND = 'yourHand',
  FLOP = 'flop',
  TURN = 'turn',
  RIVER = 'river',
  SHOW_DOWN = 'showDown',
  COLLECT_POT = 'collectPot',
  ENDING_HAND = 'endingHand',
  SMALL_BLIND = 'smallBlind',
  BIG_BLIND = 'bigBlind',
  BET = 'bet',
  CALL = 'call',
  CHECK = 'check',
  RAISE = 'raise',
  FOLD = 'fold',
}

export class TableLogType {
  private readonly value: TableLogTypeEnum;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid LogType.');
    }
    this.value = value as TableLogTypeEnum;
  }

  get(): string {
    return this.value;
  }

  equals(other: TableLogType): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return Object.values(TableLogTypeEnum).includes(value as TableLogTypeEnum);
  }
}
