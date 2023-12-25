import { Table } from '../../domain/entities/Table';

export interface ITableRepository {
  create(table: Table): Promise<Table>;
}
