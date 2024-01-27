import { Game } from '../entities/Game';
import { GameResult } from '../value-objects/GameResult';
import { Ulid } from '../value-objects/Ulid';

export class GameFactory {
  create(tableId: Ulid, gameResult: GameResult): Game {
    const id = Ulid.create();
    return new Game(id, tableId, gameResult, new Date(), new Date());
  }
}
