import { TableLog as PrismaTableLog } from '@prisma/client';
import { TableLog } from '../../../../domain/entities/TableLog';
import { TableLogType } from '../../../../domain/value-objects/TableLogType';
import { Ulid } from '../../../../domain/value-objects/Ulid';

export class TableLogTransformer {
  static toModel(prismaTableLog: PrismaTableLog): TableLog {
    return new TableLog(
      new Ulid(prismaTableLog.id),
      new Ulid(prismaTableLog.tableId),
      prismaTableLog.gameId ? new Ulid(prismaTableLog.gameId) : null,
      new TableLogType(prismaTableLog.type),
      prismaTableLog.params,
      new Date(prismaTableLog.createdAt),
      new Date(prismaTableLog.updatedAt),
    );
  }

  static toPrismaModel(tableLog: TableLog): PrismaTableLog {
    return {
      id: tableLog.id.get(),
      tableId: tableLog.tableId.get(),
      gameId: tableLog.gameId ? tableLog.gameId.get() : null,
      type: tableLog.type.get(),
      params: tableLog.params,
      createdAt: tableLog.createdAt,
      updatedAt: tableLog.updatedAt,
    };
  }
}
