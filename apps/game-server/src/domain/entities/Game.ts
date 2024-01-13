import { GameResult } from '../value-objects/GameResult';
import { Ulid } from '../value-objects/Ulid';

export class Game {
  constructor(
    public readonly id: Ulid,
    public readonly tableId: Ulid,
    public readonly result: GameResult,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
