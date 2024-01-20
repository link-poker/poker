import { Game } from '../../domain/entities/Game';

export interface IGameRepository {
  create(game: Game): Promise<Game>;
}
