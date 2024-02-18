import { PokerLog as PrismaPokerLog } from '@prisma/client';
import { PokerLog } from '../../../../domain/entities/PokerLog';
import { PokerLogType } from '../../../../domain/value-objects/PokerLogType';
import { Ulid } from '../../../../domain/value-objects/Ulid';

export class PokerLogTransformer {
  static toModel(prismaPokerLog: PrismaPokerLog): PokerLog {
    return new PokerLog(
      new Ulid(prismaPokerLog.id),
      new Ulid(prismaPokerLog.tableId),
      new Ulid(prismaPokerLog.gameId),
      new PokerLogType(prismaPokerLog.type),
      prismaPokerLog.params,
      new Date(prismaPokerLog.createdAt),
      new Date(prismaPokerLog.updatedAt),
    );
  }

  static toPrismaModel(pokerLog: PokerLog): PrismaPokerLog {
    return {
      id: pokerLog.id.get(),
      tableId: pokerLog.tableId.get(),
      gameId: pokerLog.gameId.get(),
      type: pokerLog.type.get(),
      params: pokerLog.params,
      createdAt: pokerLog.createdAt,
      updatedAt: pokerLog.updatedAt,
    };
  }
}
