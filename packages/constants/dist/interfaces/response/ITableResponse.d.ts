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
        gameId?: string;
        bigBlind: number;
        smallBlind: number;
        buyIn: number;
        players: (IPlayerInfoForOthersResponse | undefined)[];
        activePlayers: IPlayerInfoForOthersResponse[];
        actingPlayers: IPlayerInfoForOthersResponse[];
        bigBlindPlayer?: IPlayerInfoForOthersResponse;
        currentActor?: IPlayerInfoForOthersResponse;
        currentRound?: string;
        currentBet?: number;
        currentPot?: number;
        dealer?: IPlayerInfoForOthersResponse;
        lastActor?: IPlayerInfoForOthersResponse;
        sidePots: number[];
        smallBlindPlayer?: IPlayerInfoForOthersResponse;
        commonCards: string[];
        winners?: IPlayerInfoForOthersResponse[];
    };
}
