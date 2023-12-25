import { PrismaClient } from '@prisma/client';
import { GameTransformer } from '../transformers/GameTransformer';
import { Game } from '../../domain/entities/Game';

export class GameRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(game: Game) {
    await this.prisma.game.create({
      data: GameTransformer.toPrismaModel(game),
    });
    return game;
  }
}
