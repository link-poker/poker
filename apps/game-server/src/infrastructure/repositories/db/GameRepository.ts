import { PrismaClient } from '@prisma/client';
import { Game } from '../../../domain/entities/Game';
import { IGameRepository } from '../../../interfaces/repository/IGameRepository';
import { GameTransformer } from './transformers/GameTransformer';

export class GameRepository implements IGameRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(game: Game) {
    await this.prisma.game.create({
      data: GameTransformer.toPrismaModel(game),
    });
    return game;
  }
}
