import { TableLog } from '../../domain/entities/TableLog';
import { Ulid } from '../../domain/value-objects/Ulid';
import { ITableLogRepository } from '../../interfaces/repository/ITableLogRepository';

export class TableLogApplicationService {
  constructor(private readonly tableLogRepository: ITableLogRepository) {}

  async getManyByTableId(tableIdStr: string): Promise<TableLog[]> {
    const tableId = new Ulid(tableIdStr);
    return this.tableLogRepository.findByTableId(tableId);
  }
}
