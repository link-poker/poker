import { z } from 'zod';
import { ValidationError } from '../../error';

const TableLogTypeList = [
  'STARTING_HAND',
  'STACK',
  'YOUR_HAND',
  'FLOP',
  'TURN',
  'RIVER',
  'SHOW_DOWN',
  'COLLECT_POT',
  'ENDING_HAND',
  'SMALL_BLIND',
  'BIG_BLIND',
  'BET',
  'CALL',
  'CHECK',
  'RAISE',
  'FOLD',
] as const;
type TableLogTypeEnum = (typeof TableLogTypeList)[number];

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
    return z.enum(TableLogTypeList).safeParse(value).success;
  }
}
