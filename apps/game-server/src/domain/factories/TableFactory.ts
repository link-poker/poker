import { User } from '../entities/User';
import { Table } from '../entities/Table';
import { Ulid } from '../value-objects/Ulid';
import { TableStatus, TableStatusEnum } from '../value-objects/TableStatus';
import { Currency } from '../value-objects/Currency';
import { BuyIn } from '../value-objects/BuyIn';
import { BigBlind } from '../value-objects/BigBlind';
import { SmallBlind } from '../value-objects/SmallBlind';
import { Poker } from '../core/Poker';

export class TableFactory {
  create(owner: User, currency: Currency, smallBlind: SmallBlind, bigBlind: BigBlind, buyIn: BuyIn): Table {
    const id = Ulid.create();
    const tableStatus = new TableStatus(TableStatusEnum.WAITING);
    const poker = new Poker(buyIn.get(), smallBlind.get(), bigBlind.get());
    return new Table(id, owner, currency, tableStatus, new Date(), new Date(), poker);
  }
}
