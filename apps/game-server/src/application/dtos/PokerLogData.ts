import { IPokerLogResponse } from '@link-poker/constants';
import { PokerLog } from '../../domain/entities/PokerLog';

export class PokerLogData implements IPokerLogResponse {
  id: string;
  tableId: string;
  gameId: string;
  type: string;
  params: string;
  comment: string;
  createdAt: string;
  updatedAt: string;

  constructor(pokerLog: PokerLog) {
    this.id = pokerLog.id.get();
    this.tableId = pokerLog.tableId.get();
    this.gameId = pokerLog.gameId.get();
    this.type = pokerLog.type.get();
    this.params = pokerLog.params;
    this.comment = pokerLog.getPokerLogComment().get();
    this.createdAt = pokerLog.createdAt.toISOString();
    this.updatedAt = pokerLog.updatedAt.toISOString();
  }
}
