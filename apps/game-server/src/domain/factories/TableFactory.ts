import { User } from '../entities/User';
import { Table } from '../entities/Table';
import { Ulid } from '../value-objects/Ulid';
import { TableStatus, TableStatusEnum } from '../value-objects/TableStatus';

export class TableFactory {
  create(owner: User, currency: string, smallBlind: number, bigBlind: number, buyIn: number): Table {
    const id = Ulid.create();
    const tableStatus = new TableStatus(TableStatusEnum.WAITING);
    return new Table(id, owner, currency, smallBlind, bigBlind, buyIn, tableStatus, new Date(), new Date());
  }
}
