import { CardInfo } from '../../domain/core/Card';

export interface IPlayerInfoForOthersResponse {
  id: string;
  bet: number;
  raise: number | null;
  holeCards: CardInfo[] | null;
  folded: boolean;
  showCards: boolean;
  left: boolean;
}
