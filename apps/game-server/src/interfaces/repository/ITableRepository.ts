import { Table } from '../../domain/entities/Table';
import { Ulid } from '../../domain/value-objects/Ulid';

export interface ITableRepository {
  create(table: Table): Promise<Table>;
  findById(id: Ulid): Promise<Table>;
  update(table: Table): Promise<void>;
}
