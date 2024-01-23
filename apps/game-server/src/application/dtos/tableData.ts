import { Table } from '../../domain/entities/Table';
import { ITableResponse } from '../../interfaces/response/ITableResponse';
import { IUserResponse } from '../../interfaces/response/IUserResponse';
import { IPlayerInfoForOthersResponse } from '../../interfaces/response/IPlayerInfoForOthersResponse';
import { PlayerInfoForOthersData } from './PlayerInfoForOthersData';
import { UserData } from './UserData';

export class TableData implements ITableResponse {
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
    actingPlayers: IPlayerInfoForOthersResponse[];
    activePlayers: IPlayerInfoForOthersResponse[];
    currentActor: IPlayerInfoForOthersResponse | null;
    currentPot: number;
    dealer: IPlayerInfoForOthersResponse | null;
    lastActor: IPlayerInfoForOthersResponse | null;
    sidePots: number[];
    smallBlindPlayer: IPlayerInfoForOthersResponse | null;
    bigBlindPlayer: IPlayerInfoForOthersResponse | null;
    commonCards: string[];
  };

  constructor(table: Table) {
    const tableInfo = table.getTableInfoForPlayers();
    this.id = table.id.get();
    this.owner = new UserData(table.owner);
    this.currency = table.currency.get();
    this.status = table.status.get();
    this.createdAt = tableInfo.createdAt.toISOString();
    this.updatedAt = tableInfo.updatedAt.toISOString();
    this.poker = {
      bigBlind: tableInfo.poker.bigBlind.get(),
      smallBlind: tableInfo.poker.smallBlind.get(),
      buyIn: tableInfo.poker.buyIn.get(),
      players: tableInfo.poker.players.map(player => (player ? new PlayerInfoForOthersData(player) : null)),
      actingPlayers: tableInfo.poker.actingPlayers.map(player => new PlayerInfoForOthersData(player)),
      activePlayers: tableInfo.poker.activePlayers.map(player => new PlayerInfoForOthersData(player)),
      currentActor: tableInfo.poker.currentActor ? new PlayerInfoForOthersData(tableInfo.poker.currentActor) : null,
      currentPot: tableInfo.poker.currentPot?.amount || 0,
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
    };
  }
}
