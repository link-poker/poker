import { PrismaClient } from '@prisma/client';
import { PokerLog } from '../../../domain/entities/PokerLog';
import { IPokerLogRepository } from '../../../interfaces/repository/IPokerLogRepository';
import { PokerLogTransformer } from './transformers/PokerLogTransformer';

export class PokerLogRepository implements IPokerLogRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(pokerLog: PokerLog) {
    await this.prisma.pokerLog.create({
      data: PokerLogTransformer.toPrismaModel(pokerLog),
    });
    return pokerLog;
  }
}
