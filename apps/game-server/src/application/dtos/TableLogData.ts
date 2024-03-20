import { ITableLogResponse } from '@link-poker/constants';
import { TableLog } from '../../domain/entities/TableLog';

export class TableLogData implements ITableLogResponse {
  id: string;
  tableId: string;
  gameId: string | null;
  type: string;
  params: string;
  comment: string;
  createdAt: string;
  updatedAt: string;

  constructor(tableLog: TableLog) {
    this.id = tableLog.id.get();
    this.tableId = tableLog.tableId.get();
    this.gameId = tableLog.gameId ? tableLog.gameId.get() : null;
    this.type = tableLog.type.get();
    this.params = tableLog.params;
    this.comment = tableLog.getTableLogComment().get();
    this.createdAt = tableLog.createdAt.toISOString();
    this.updatedAt = tableLog.updatedAt.toISOString();
  }
}
