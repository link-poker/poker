import { PlayerInfoForOthers } from '../../domain/core/Player';
import { IPlayerInfoForOthersResponse } from '../../interfaces/response/IPlayerInfoForOthersResponse';

export class PlayerInfoForOthersData implements IPlayerInfoForOthersResponse {
  id: string;
  bet: number;
  raise: number | null;
  holeCards: { rank: string; suit: string }[];
  folded: boolean;
  showCards: boolean;
  left: boolean;

  constructor(player: PlayerInfoForOthers) {
    this.id = player.id;
    this.bet = player.bet;
    this.raise = player.raise;
    this.holeCards = player.holeCards;
    this.folded = player.folded;
    this.showCards = player.showCards;
    this.left = player.left;
  }
}
