import { Ulid } from '../value-objects/Ulid';
import { Game } from '../entities/Game';

export class GameFactory {
  create(tableId: Ulid): Game {
    const id = Ulid.create();
    return new Game(id, tableId, null, new Date(), new Date());
  }
}
