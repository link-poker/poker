import { PrismaClient } from '@prisma/client';
import { Table } from '../../../domain/entities/Table';
import { Ulid } from '../../../domain/value-objects/Ulid';
import { ITableRepository } from '../../../interfaces/repository/ITableRepository';
import { TableTransformer } from './transformers/TableTransformer';

export class TableRepository implements ITableRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(Table: Table) {
    await this.prisma.table.create({
      data: TableTransformer.toPrismaModel(Table),
    });
    return Table;
  }

  async findById(id: Ulid) {
    const table = await this.prisma.table.findUnique({
      where: {
        id: id.get(),
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
