import { Prisma, Table as PrismaTable } from '@prisma/client';
import { Poker } from '../../../../domain/core/Poker';
import { Table } from '../../../../domain/entities/Table';
import { Currency } from '../../../../domain/value-objects/Currency';
import { TableStatus } from '../../../../domain/value-objects/TableStatus';
import { Ulid } from '../../../../domain/value-objects/Ulid';
import { UserTransformer } from './UserTransformer';

const prismaAggregateTable = Prisma.validator<Prisma.TableDefaultArgs>()({
  include: {
    user: true,
  },
});

type PrismaAggregateModel = Prisma.TableGetPayload<typeof prismaAggregateTable>;

export class TableTransformer {
  static toModel(prismaAggregateTable: PrismaAggregateModel): Table {
    const poker = new Poker();
    const pokerStateJson = JSON.parse(prismaAggregateTable.pokerState);
    poker.restoreState(pokerStateJson);
    const table = new Table(
      new Ulid(prismaAggregateTable.id),
      UserTransformer.toModel(prismaAggregateTable.user),
      new Currency(prismaAggregateTable.currency),
      new TableStatus(prismaAggregateTable.status),
      new Date(prismaAggregateTable.createdAt),
      new Date(prismaAggregateTable.updatedAt),
      poker,
    );
    return table;
  }

  static toPrismaAggregateModel(table: Table): PrismaAggregateModel {
    return {
      ...TableTransformer.toPrismaModel(table),
      user: UserTransformer.toPrismaModel(table.owner),
    };
  }

  static toPrismaModel(table: Table): PrismaTable {
    return {
      id: table.id.get(),
      ownerId: table.owner.id.get(),
      currency: table.currency.get(),
      status: table.status.get(),
      pokerState: table.getPokerState(),
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
    };
  }
}
