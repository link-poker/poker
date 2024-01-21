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
    actingPlayers: IPlayerInfoForOthersResponse[];
    activePlayers: IPlayerInfoForOthersResponse[];
    bigBlindPlayer: IPlayerInfoForOthersResponse | null;
    currentActor: IPlayerInfoForOthersResponse | null;
    currentPot: number;
    dealer: IPlayerInfoForOthersResponse | null;
    lastActor: IPlayerInfoForOthersResponse | null;
    sidePots: number[];
    smallBlindPlayer: IPlayerInfoForOthersResponse | null;
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
      bigBlind: tableInfo.poker.bigBlind,
      smallBlind: tableInfo.poker.smallBlind,
      buyIn: tableInfo.poker.buyIn,
      actingPlayers: tableInfo.poker.actingPlayers.map(player => new PlayerInfoForOthersData(player)),
      activePlayers: tableInfo.poker.activePlayers.map(player => new PlayerInfoForOthersData(player)),
      bigBlindPlayer: tableInfo.poker.bigBlindPlayer
        ? new PlayerInfoForOthersData(tableInfo.poker.bigBlindPlayer)
        : null,
      currentActor: tableInfo.poker.currentActor ? new PlayerInfoForOthersData(tableInfo.poker.currentActor) : null,
      currentPot: tableInfo.poker.currentPot?.amount || 0,
      dealer: tableInfo.poker.dealer ? new PlayerInfoForOthersData(tableInfo.poker.dealer) : null,
      lastActor: tableInfo.poker.lastActor ? new PlayerInfoForOthersData(tableInfo.poker.lastActor) : null,
      sidePots: tableInfo.poker.sidePots?.map(sidePot => sidePot.amount) || [],
      smallBlindPlayer: tableInfo.poker.smallBlindPlayer
        ? new PlayerInfoForOthersData(tableInfo.poker.smallBlindPlayer)
        : null,
    };
  }
}
