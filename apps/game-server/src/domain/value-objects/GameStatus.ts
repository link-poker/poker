import { ValidationError } from '../../error';

export enum GameStatusEnum {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

export class GameStatus {
  private readonly value: GameStatusEnum;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Game status.');
    }
    this.value = value as GameStatusEnum;
  }

  get(): string {
    return this.value;
  }

  equals(other: GameStatus): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return Object.values(GameStatusEnum).includes(value as GameStatusEnum);
  }
}
