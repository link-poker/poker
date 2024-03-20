import { TableLog } from '../../domain/entities/TableLog';
import { Ulid } from '../../domain/value-objects/Ulid';

export interface ITableLogRepository {
  createMany(tableLogs: TableLog[]): Promise<TableLog[]>;
  findByTableId(tableId: Ulid): Promise<TableLog[]>;
}
