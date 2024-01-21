import { PlayerInfoForOthers } from '../../domain/core/Player';
import { IPlayerInfoForOthersResponse } from '../../interfaces/response/IPlayerInfoForOthersResponse';

export class PlayerInfoForOthersData implements IPlayerInfoForOthersResponse {
  id: string;
  name: string;
  bet: number;
  raise: number | null;
  holeCards: { rank: string; suit: string }[];
  folded: boolean;
  showCards: boolean;
  left: boolean;
  hand: string | null;

  constructor(player: PlayerInfoForOthers) {
    this.id = player.id;
    this.name = player.name;
    this.bet = player.bet;
    this.raise = player.raise;
    this.holeCards = player.holeCards;
    this.folded = player.folded;
    this.showCards = player.showCards;
    this.left = player.left;
    this.hand = player.hand;
  }
}
