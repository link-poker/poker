import { Game as PrismaGame } from '@prisma/client';
import { Game } from '../../../../domain/entities/Game';
import { GameResult } from '../../../../domain/value-objects/GameResult';
import { Ulid } from '../../../../domain/value-objects/Ulid';

export class GameTransformer {
  static toModel(PrismaGame: PrismaGame): Game {
    return new Game(
      new Ulid(PrismaGame.id),
      new Ulid(PrismaGame.tableId),
      new GameResult(PrismaGame.result),
      new Date(PrismaGame.createdAt),
      new Date(PrismaGame.updatedAt),
    );
  }

  static toPrismaModel(game: Game): PrismaGame {
    return {
      id: game.id.get(),
      tableId: game.tableId.get(),
      result: game.result.get(),
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    };
  }
}
