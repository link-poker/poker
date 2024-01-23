import { PlayerPrivateInfo } from '../../domain/core/Player';
import { IPlayerPrivateInfoResponse } from '../../interfaces/response/IPlayerPrivateInfoResponse';

export class PlayerPrivateInfoData implements IPlayerPrivateInfoResponse {
  holeCards: string[];
  hand: string | null;

  constructor(playerPrivateInfo: PlayerPrivateInfo) {
    this.holeCards = playerPrivateInfo.holeCards;
    this.hand = playerPrivateInfo.hand;
  }
}
