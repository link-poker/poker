import { Prisma, Table as PrismaTable } from '@prisma/client';
import { Table } from '../../../../domain/entities/Table';
import { Ulid } from '../../../../domain/value-objects/Ulid';
import { UserTransformer } from './UserTransformer';
import { TableStatus } from '../../../../domain/value-objects/TableStatus';
import { Currency } from '../../../../domain/value-objects/Currency';
import { SmallBlind } from '../../../../domain/value-objects/SmallBlind';
import { BigBlind } from '../../../../domain/value-objects/BigBlind';
import { BuyIn } from '../../../../domain/value-objects/BuyIn';

const prismaAggregateTable = Prisma.validator<Prisma.TableDefaultArgs>()({
  include: {
    user: true,
  },
});

type PrismaAggregateModel = Prisma.TableGetPayload<typeof prismaAggregateTable>;

export class TableTransformer {
  static toModel(prismaAggregateTable: PrismaAggregateModel): Table {
    const table = new Table(
      new Ulid(prismaAggregateTable.id),
      UserTransformer.toModel(prismaAggregateTable.user),
      new Currency(prismaAggregateTable.currency),
      new SmallBlind(prismaAggregateTable.smallBlind),
      new BigBlind(prismaAggregateTable.bigBlind),
      new BuyIn(prismaAggregateTable.buyIn),
      new TableStatus(prismaAggregateTable.status),
      new Date(prismaAggregateTable.createdAt),
      new Date(prismaAggregateTable.updatedAt),
    );
    table.setPokerState(prismaAggregateTable.pokerState);
    return table;
  }

  static toPrismaAggregateModel(table: Table): PrismaAggregateModel {
    return {
      ...TableTransformer.toPrismaModel(table),
      user: UserTransformer.toPrismaModel(table.user),
    };
  }

  static toPrismaModel(table: Table): PrismaTable {
    return {
      id: table.id.get(),
      userId: table.user.id.get(),
      currency: table.currency.get(),
      smallBlind: table.smallBlind.get(),
      bigBlind: table.bigBlind.get(),
      buyIn: table.buyIn.get(),
      status: table.status.get(),
      pokerState: table.getPokerState(),
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
    };
  }
}
