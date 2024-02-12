import { IPlayerInfoForOthersResponse } from './IPlayerInfoForOthersResponse';
import { IUserResponse } from './IUserResponse';

export interface ITableResponse {
  id: string;
  owner: IUserResponse;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  poker: {
    bigBlind: number;
    smallBlind: number;
    buyIn: number;
    players: (IPlayerInfoForOthersResponse | null)[]; // array of 10
    activePlayers: IPlayerInfoForOthersResponse[];
    actingPlayers: IPlayerInfoForOthersResponse[];
    bigBlindPlayer: IPlayerInfoForOthersResponse | null;
    currentActor: IPlayerInfoForOthersResponse | null;
    currentRound: string | null;
    currentBet: number | null;
    currentPot: number | null;
    dealer: IPlayerInfoForOthersResponse | null;
    lastActor: IPlayerInfoForOthersResponse | null;
    sidePots: number[];
    smallBlindPlayer: IPlayerInfoForOthersResponse | null;
    commonCards: string[];
    winners: IPlayerInfoForOthersResponse[] | null;
  };
}
