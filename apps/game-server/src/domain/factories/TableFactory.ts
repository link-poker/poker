import { User } from '../entities/User';
import { Table } from '../entities/Table';
import { Ulid } from '../value-objects/Ulid';

export class TableFactory {
  create(owner: User, currency: string, buyIn: number, smallBlind: number, bigBlind: number): Table {
    const id = Ulid.create();
    return new Table(id, owner, currency, smallBlind, bigBlind, buyIn, new Date(), new Date());
  }
}
