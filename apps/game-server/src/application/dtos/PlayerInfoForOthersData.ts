import { IPlayerInfoForOthersResponse } from '@link-poker/constants';
import { PlayerInfoForOthers } from '../../domain/core/Player';

export class PlayerInfoForOthersData implements IPlayerInfoForOthersResponse {
  id: string;
  name: string;
  stack: number;
  bet: number;
  raise?: number;
  holeCards: string[];
  folded: boolean;
  showCards: boolean;
  left: boolean;
  away: boolean;
  hand?: string;

  constructor(player: PlayerInfoForOthers) {
    this.id = player.id;
    this.name = player.name;
    this.stack = player.stackSize;
    this.bet = player.bet;
    this.raise = player.raise;
    this.holeCards = player.holeCards;
    this.folded = player.folded;
    this.showCards = player.showCards;
    this.left = player.left;
    this.away = player.away;
    this.hand = player.hand;
  }
}
