import { IPlayerPrivateInfoResponse } from '@link-poker/constants';
import { PlayerPrivateInfo } from '../../domain/core/Player';

export class PlayerPrivateInfoData implements IPlayerPrivateInfoResponse {
  holeCards: string[];
  hand?: string;

  constructor(playerPrivateInfo: PlayerPrivateInfo) {
    this.holeCards = playerPrivateInfo.holeCards;
    this.hand = playerPrivateInfo.hand;
  }
}
