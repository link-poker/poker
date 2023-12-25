import { Ulid } from '../value-objects/Ulid';
import { Game } from '../entities/Game';
import { GameStatus, GameStatusEnum } from '../value-objects/GameStatus';

export class GameFactory {
  create(gameId: Ulid): Game {
    const id = Ulid.create();
    const gameStatus = new GameStatus(GameStatusEnum.WAITING);
    return new Game(id, gameId, gameStatus, new Date(), new Date());
  }
}
