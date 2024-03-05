import { PokerLog } from '../../domain/entities/PokerLog';
import { Ulid } from '../../domain/value-objects/Ulid';
import { IPokerLogRepository } from '../../interfaces/repository/IPokerLogRepository';

export class PokerLogApplicationService {
  constructor(private readonly pokerLogRepository: IPokerLogRepository) {}

  async getManyByTableId(tableIdStr: string): Promise<PokerLog[]> {
    const tableId = new Ulid(tableIdStr);
    return this.pokerLogRepository.findByTableId(tableId);
  }
}
