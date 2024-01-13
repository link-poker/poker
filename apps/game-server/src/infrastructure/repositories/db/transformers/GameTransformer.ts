import { Game as PrismaGame } from '@prisma/client';
import { Game } from '../../../../domain/entities/Game';
import { Ulid } from '../../../../domain/value-objects/Ulid';
import { TableStatus } from '../../../../domain/value-objects/TableStatus';

export class GameTransformer {
  static toModel(PrismaGame: PrismaGame): Game {
    return new Game(
      new Ulid(PrismaGame.id),
      new Ulid(PrismaGame.tableId),
      PrismaGame.result,
      new Date(PrismaGame.createdAt),
      new Date(PrismaGame.updatedAt),
    );
  }

  static toPrismaModel(game: Game): PrismaGame {
    return {
      id: game.id.get(),
      tableId: game.tableId.get(),
      result: game.result,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    };
  }
}
