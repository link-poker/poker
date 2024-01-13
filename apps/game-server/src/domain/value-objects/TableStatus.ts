import { ValidationError } from '../../error';

export enum TableStatusEnum {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

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
    return Object.values(TableStatusEnum).includes(value as TableStatusEnum);
  }
}
