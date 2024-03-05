import { PrismaClient } from '@prisma/client';
import { PokerLog } from '../../../domain/entities/PokerLog';
import { Ulid } from '../../../domain/value-objects/Ulid';
import { IPokerLogRepository } from '../../../interfaces/repository/IPokerLogRepository';
import { PokerLogTransformer } from './transformers/PokerLogTransformer';

export class PokerLogRepository implements IPokerLogRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async createMany(pokerLogs: PokerLog[]): Promise<PokerLog[]> {
    await this.prisma.pokerLog.createMany({
      data: pokerLogs.map(pokerLog => PokerLogTransformer.toPrismaModel(pokerLog)),
    });
    return pokerLogs;
  }

  async findByTableId(tableId: Ulid): Promise<PokerLog[]> {
    const pokerLogs = await this.prisma.pokerLog.findMany({
      where: {
        tableId: tableId.get(),
      },
    });
    return pokerLogs.map(pokerLog => PokerLogTransformer.toModel(pokerLog));
  }
}
