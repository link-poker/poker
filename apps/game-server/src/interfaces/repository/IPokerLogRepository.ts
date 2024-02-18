import { PokerLog } from '../../domain/entities/PokerLog';

export interface IPokerLogRepository {
  create(game: PokerLog): Promise<PokerLog>;
}
