import { GameStatus } from '../value-objects/GameStatus';
import { Ulid } from '../value-objects/Ulid';

export class Game {
  constructor(
    public readonly id: Ulid,
    public readonly tableId: Ulid,
    public readonly status: GameStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
