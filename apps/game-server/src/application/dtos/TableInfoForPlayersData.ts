import { IPlayerInfoForOthersResponse, ITableResponse, IUserResponse } from '@link-poker/constants';
import { TableInfoForPlayers } from '../../domain/entities/Table';
import { PlayerInfoForOthersData } from './PlayerInfoForOthersData';
import { UserData } from './UserData';

export class TableInfoForPlayersData implements ITableResponse {
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
    players: (IPlayerInfoForOthersResponse | undefined)[]; // array of 10
    actingPlayers: IPlayerInfoForOthersResponse[];
    activePlayers: IPlayerInfoForOthersResponse[];
    currentActor?: IPlayerInfoForOthersResponse;
    currentRound?: string;
    currentBet?: number;
    currentPot?: number;
    dealer?: IPlayerInfoForOthersResponse;
    lastActor?: IPlayerInfoForOthersResponse;
    sidePots: number[];
    smallBlindPlayer?: IPlayerInfoForOthersResponse;
    bigBlindPlayer?: IPlayerInfoForOthersResponse;
    commonCards: string[];
    winners?: IPlayerInfoForOthersResponse[];
  };

  constructor(tableInfo: TableInfoForPlayers) {
    this.id = tableInfo.id.get();
    this.owner = new UserData(tableInfo.owner);
    this.currency = tableInfo.currency.get();
    this.status = tableInfo.status.get();
    this.createdAt = tableInfo.createdAt.toISOString();
    this.updatedAt = tableInfo.updatedAt.toISOString();
    this.poker = {
      gameId: tableInfo.poker.gameId?.get(),
      bigBlind: tableInfo.poker.bigBlind.get(),
      smallBlind: tableInfo.poker.smallBlind.get(),
      buyIn: tableInfo.poker.buyIn.get(),
      players: tableInfo.poker.players.map(player => player && new PlayerInfoForOthersData(player)),
      actingPlayers: tableInfo.poker.actingPlayers.map(player => new PlayerInfoForOthersData(player)),
      activePlayers: tableInfo.poker.activePlayers.map(player => new PlayerInfoForOthersData(player)),
      currentActor: tableInfo.poker.currentActor && new PlayerInfoForOthersData(tableInfo.poker.currentActor),
      currentRound: tableInfo.poker.currentRound?.get(),
      currentBet: tableInfo.poker.currentBet?.get(),
      currentPot: tableInfo.poker.currentPot?.amount,
      dealer: tableInfo.poker.dealer && new PlayerInfoForOthersData(tableInfo.poker.dealer),
      lastActor: tableInfo.poker.lastActor && new PlayerInfoForOthersData(tableInfo.poker.lastActor),
      sidePots: tableInfo.poker.sidePots?.map(sidePot => sidePot.amount) || [],
      bigBlindPlayer: tableInfo.poker.bigBlindPlayer && new PlayerInfoForOthersData(tableInfo.poker.bigBlindPlayer),
      smallBlindPlayer:
        tableInfo.poker.smallBlindPlayer && new PlayerInfoForOthersData(tableInfo.poker.smallBlindPlayer),
      commonCards: tableInfo.poker.commonCards.map(card => card.toString()),
      winners: tableInfo.poker.winners && tableInfo.poker.winners.map(player => new PlayerInfoForOthersData(player)),
    };
  }
}
