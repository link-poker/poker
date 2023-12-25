import { PrismaClient } from '@prisma/client';
import { TableTransformer } from '../transformers/TableTransformer';
import { Table } from '../../domain/entities/Table';

export class TableRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(Table: Table) {
    await this.prisma.table.create({
      data: TableTransformer.toPrismaCreateModel(Table),
    });
    return Table;
  }
}
