import { Prisma, Table as PrismaCreateTable } from '@prisma/client';
import { Table } from '../../domain/entities/Table';
import { Ulid } from '../../domain/value-objects/Ulid';
import { UserTransformer } from './UserTransformer';

const prismaTable = Prisma.validator<Prisma.TableDefaultArgs>()({
  include: {
    user: true,
  },
});

type PrismaTable = Prisma.TableGetPayload<typeof prismaTable>;

export class TableTransformer {
  static toModel(PrismaTable: PrismaTable): Table {
    return new Table(
      new Ulid(PrismaTable.id),
      UserTransformer.toModel(PrismaTable.user),
      PrismaTable.currency,
      PrismaTable.smallBlind,
      PrismaTable.bigBlind,
      PrismaTable.buyIn,
      new Date(PrismaTable.createdAt),
      new Date(PrismaTable.updatedAt),
    );
  }

  static toPrismaModel(table: Table): PrismaTable {
    return {
      ...TableTransformer.toPrismaCreateModel(table),
      user: UserTransformer.toPrismaModel(table.user),
    };
  }

  static toPrismaCreateModel(table: Table): PrismaCreateTable {
    return {
      id: table.id.get(),
      userId: table.user.id.get(),
      currency: table.currency,
      smallBlind: table.smallBlind,
      bigBlind: table.bigBlind,
      buyIn: table.buyIn,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
    };
  }
}
