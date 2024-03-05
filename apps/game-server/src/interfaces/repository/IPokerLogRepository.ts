import { PokerLog } from '../../domain/entities/PokerLog';
import { Ulid } from '../../domain/value-objects/Ulid';

export interface IPokerLogRepository {
  createMany(pokerLogs: PokerLog[]): Promise<PokerLog[]>;
  findByTableId(tableId: Ulid): Promise<PokerLog[]>;
}
