import { z } from 'zod';
import { ValidationError } from '../../error';

const TableStatusList = ['WAITING', 'PLAYING', 'FINISHED'] as const;
type TableStatusEnum = (typeof TableStatusList)[number];

export class TableStatus {
  private readonly value: TableStatusEnum;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Game status.');
    }
    this.value = value as TableStatusEnum;
  }

  get(): string {
    return this.value;
  }

  equals(other: TableStatus): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.enum(TableStatusList).safeParse(value).success;
  }
}
