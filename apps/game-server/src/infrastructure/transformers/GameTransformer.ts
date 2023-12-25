import { Game as PrismaGame } from '@prisma/client';
import { Game } from '../../domain/entities/Game';
import { Ulid } from '../../domain/value-objects/Ulid';
import { GameStatus } from '../../domain/value-objects/GameStatus';

export class GameTransformer {
  static toModel(PrismaGame: PrismaGame): Game {
    return new Game(
      new Ulid(PrismaGame.id),
      new Ulid(PrismaGame.tableId),
      new GameStatus(PrismaGame.status),
      new Date(PrismaGame.createdAt),
      new Date(PrismaGame.updatedAt),
    );
  }

  static toPrismaModel(game: Game): PrismaGame {
    return {
      id: game.id.get(),
      tableId: game.tableId.get(),
      status: game.status.get(),
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    };
  }
}
