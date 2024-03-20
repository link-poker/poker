import { PrismaClient, TableLog as prismaTableLog } from '@prisma/client';
import { TableLog } from '../../../domain/entities/TableLog';
import { Ulid } from '../../../domain/value-objects/Ulid';
import { ITableLogRepository } from '../../../interfaces/repository/ITableLogRepository';
import { TableLogTransformer } from './transformers/TableLogTransformer';

export class TableLogRepository implements ITableLogRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async createMany(tableLogs: TableLog[]): Promise<TableLog[]> {
    await this.prisma.tableLog.createMany({
      data: tableLogs.map((tableLog: TableLog) => TableLogTransformer.toPrismaModel(tableLog)),
    });
    return tableLogs;
  }

  async findByTableId(tableId: Ulid): Promise<TableLog[]> {
    const tableLogs = await this.prisma.tableLog.findMany({
      where: {
        tableId: tableId.get(),
      },
    });
    return tableLogs.map((tableLog: prismaTableLog) => TableLogTransformer.toModel(tableLog));
  }
}
