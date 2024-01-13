import { Table } from '../../domain/entities/Table';

export interface ITableRepository {
  create(table: Table): Promise<Table>;
  findById(id: string): Promise<Table>;
  update(table: Table): Promise<void>;
}
