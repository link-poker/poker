import { PrismaClient } from '@prisma/client';
import { ITableRepository } from '../../../interfaces/repository/ITableRepository';
import { TableTransformer } from './transformers/TableTransformer';
import { Table } from '../../../domain/entities/Table';

export class TableRepository implements ITableRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(Table: Table) {
    await this.prisma.table.create({
      data: TableTransformer.toPrismaModel(Table),
    });
    return Table;
  }

  async findById(id: string) {
    const table = await this.prisma.table.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    if (!table || !table.user) {
      throw new Error(`Table not found for id ${id}`);
    }
    return TableTransformer.toModel(table);
  }

  async update(Table: Table) {
    await this.prisma.table.update({
      where: {
        id: Table.id.get(),
      },
      data: TableTransformer.toPrismaModel(Table),
    });
  }
}
