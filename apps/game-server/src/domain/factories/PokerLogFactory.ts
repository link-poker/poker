import { PokerLog } from '../entities/PokerLog';
import { PokerLogType } from '../value-objects/PokerLogType';
import { Ulid } from '../value-objects/Ulid';

export class PokerLogFactory {
  static create(tableId: Ulid, gameId: Ulid, type: PokerLogType, params: object): PokerLog {
    const paramsStr = JSON.stringify(params);
    return new PokerLog(Ulid.create(), tableId, gameId, type, paramsStr, new Date(), new Date());
  }
}
