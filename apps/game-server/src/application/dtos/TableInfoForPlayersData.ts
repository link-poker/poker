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
    gameId: string | null;
    bigBlind: number;
    smallBlind: number;
    buyIn: number;
    players: (IPlayerInfoForOthersResponse | null)[]; // array of 10
    actingPlayers: IPlayerInfoForOthersResponse[];
    activePlayers: IPlayerInfoForOthersResponse[];
    currentActor: IPlayerInfoForOthersResponse | null;
    currentRound: string | null;
    currentBet: number | null;
    currentPot: number | null;
    dealer: IPlayerInfoForOthersResponse | null;
    lastActor: IPlayerInfoForOthersResponse | null;
    sidePots: number[];
    smallBlindPlayer: IPlayerInfoForOthersResponse | null;
    bigBlindPlayer: IPlayerInfoForOthersResponse | null;
    commonCards: string[];
    winners: IPlayerInfoForOthersResponse[] | null;
  };

  constructor(tableInfo: TableInfoForPlayers) {
    this.id = tableInfo.id.get();
    this.owner = new UserData(tableInfo.owner);
    this.currency = tableInfo.currency.get();
    this.status = tableInfo.status.get();
    this.createdAt = tableInfo.createdAt.toISOString();
    this.updatedAt = tableInfo.updatedAt.toISOString();
    this.poker = {
      gameId: tableInfo.poker.gameId?.get() || null,
      bigBlind: tableInfo.poker.bigBlind.get(),
      smallBlind: tableInfo.poker.smallBlind.get(),
      buyIn: tableInfo.poker.buyIn.get(),
      players: tableInfo.poker.players.map(player => (player ? new PlayerInfoForOthersData(player) : null)),
      actingPlayers: tableInfo.poker.actingPlayers.map(player => new PlayerInfoForOthersData(player)),
      activePlayers: tableInfo.poker.activePlayers.map(player => new PlayerInfoForOthersData(player)),
      currentActor: tableInfo.poker.currentActor ? new PlayerInfoForOthersData(tableInfo.poker.currentActor) : null,
      currentRound: tableInfo.poker.currentRound?.get() || null,
      currentBet: tableInfo.poker.currentBet?.get() || null,
      currentPot: tableInfo.poker.currentPot?.amount || null,
      dealer: tableInfo.poker.dealer ? new PlayerInfoForOthersData(tableInfo.poker.dealer) : null,
      lastActor: tableInfo.poker.lastActor ? new PlayerInfoForOthersData(tableInfo.poker.lastActor) : null,
      sidePots: tableInfo.poker.sidePots?.map(sidePot => sidePot.amount) || [],
      bigBlindPlayer: tableInfo.poker.bigBlindPlayer
        ? new PlayerInfoForOthersData(tableInfo.poker.bigBlindPlayer)
        : null,
      smallBlindPlayer: tableInfo.poker.smallBlindPlayer
        ? new PlayerInfoForOthersData(tableInfo.poker.smallBlindPlayer)
        : null,
      commonCards: tableInfo.poker.commonCards.map(card => card.toString()),
      winners: tableInfo.poker.winners
        ? tableInfo.poker.winners.map(player => new PlayerInfoForOthersData(player))
        : null,
    };
  }
}
