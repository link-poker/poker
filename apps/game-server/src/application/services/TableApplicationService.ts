import { Table } from '../../domain/entities/Table';
import { User } from '../../domain/entities/User';
import { TableFactory } from '../../domain/factories/TableFactory';
import { WebSocketService } from '../../domain/services/WebSocketService';
import { BigBlind } from '../../domain/value-objects/BigBlind';
import { BuyIn } from '../../domain/value-objects/BuyIn';
import { Currency } from '../../domain/value-objects/Currency';
import { SeatNumber } from '../../domain/value-objects/SeatNumber';
import { SmallBlind } from '../../domain/value-objects/SmallBlind';
import { Stack } from '../../domain/value-objects/Stack';
import { ITableRepository } from '../../infrastructure/interfaces/ITableRepository';

export class TableApplicationService {
  constructor(
    private readonly tableFactory: TableFactory,
    private readonly tableRepository: ITableRepository,
    private readonly webSocketService: WebSocketService,
  ) {}

  async createTable(
    user: User,
    currencyStr: string,
    smallBlindNum: number,
    bigBlindNum: number,
    buyInNum: number,
  ): Promise<Table> {
    const currency = new Currency(currencyStr);
    const smallBlind = new SmallBlind(smallBlindNum);
    const bigBlind = new BigBlind(bigBlindNum);
    const buyIn = new BuyIn(buyInNum);
    const table = this.tableFactory.create(user, currency, smallBlind, bigBlind, buyIn);
    await this.tableRepository.create(table);
    return table;
  }

  async dealCards(tableId: string): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.dealCards();
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'dealCards',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async sitDown(tableId: string, user: User, stackNum: number, seatNumberNum: number): Promise<Table> {
    const table = await this.tableRepository.findById(tableId);
    const stack = new Stack(stackNum);
    const seatNumber = new SeatNumber(seatNumberNum);
    table.sitDown(user, stack, seatNumber);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'sitDown',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    return table;
  }

  async standUp(tableId: string, userId: string): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.standUp(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'standUp',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async call(tableId: string, userId: string): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.call(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'call',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async check(tableId: string, userId: string): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.check(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'check',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async fold(tableId: string, userId: string): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.fold(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'fold',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async bet(tableId: string, userId: string, amount: number): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.bet(userId, amount);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'bet',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async raise(tableId: string, userId: string, amount: number): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.raise(userId, amount);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'raise',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async addOn(tableId: string, userId: string, amount: number): Promise<void> {
    const table = await this.tableRepository.findById(tableId);
    table.addOn(userId, amount);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'addOn',
      payload: { tableInfo: table.getTableInfoForPlayers() },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }
}