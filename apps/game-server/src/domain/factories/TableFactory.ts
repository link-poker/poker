import { Poker } from '../core/Poker';
import { Table } from '../entities/Table';
import { User } from '../entities/User';
import { BigBlind } from '../value-objects/BigBlind';
import { BuyIn } from '../value-objects/BuyIn';
import { Currency } from '../value-objects/Currency';
import { SmallBlind } from '../value-objects/SmallBlind';
import { TableStatus, TableStatusEnum } from '../value-objects/TableStatus';
import { Ulid } from '../value-objects/Ulid';

export class TableFactory {
  create(owner: User, currency: Currency, smallBlind: SmallBlind, bigBlind: BigBlind, buyIn: BuyIn): Table {
    const id = Ulid.create();
    const tableStatus = new TableStatus(TableStatusEnum.WAITING);
    const poker = new Poker(buyIn.get(), smallBlind.get(), bigBlind.get());
    return new Table(id, owner, currency, tableStatus, new Date(), new Date(), poker);
  }
}
