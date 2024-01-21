import { Table } from '../../domain/entities/Table';
import { User } from '../../domain/entities/User';
import { TableFactory } from '../../domain/factories/TableFactory';
import { WebSocketService } from '../../domain/services/WebSocketService';
import { AddOnAmount } from '../../domain/value-objects/AddOnAmount';
import { BetAmount } from '../../domain/value-objects/BetAmount';
import { BigBlind } from '../../domain/value-objects/BigBlind';
import { BuyIn } from '../../domain/value-objects/BuyIn';
import { Currency } from '../../domain/value-objects/Currency';
import { RaiseAmount } from '../../domain/value-objects/RaiseAmount';
import { SeatNumber } from '../../domain/value-objects/SeatNumber';
import { SmallBlind } from '../../domain/value-objects/SmallBlind';
import { Stack } from '../../domain/value-objects/Stack';
import { Ulid } from '../../domain/value-objects/Ulid';
import { ITableRepository } from '../../interfaces/repository/ITableRepository';
import { PlayerPrivateInfoData } from '../dtos/PlayerPrivateInfoData';
import { TableData } from '../dtos/TableData';

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

  async dealCards(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    table.dealCards();
    const playerPrivateInfo = table.getPlayerPrivateInfo(new Ulid(userIdStr));
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'dealCards',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async sitDown(tableIdStr: string, user: User, stackNum: number, seatNumberNum: number): Promise<Table> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const stack = new Stack(stackNum);
    const seatNumber = new SeatNumber(seatNumberNum);
    table.sitDown(user, stack, seatNumber);
    const playerPrivateInfo = table.getPlayerPrivateInfo(user.id);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'sitDown',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    return table;
  }

  async standUp(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.standUp(userId);
    const playerPrivateInfo = table.getPlayerPrivateInfo(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'standUp',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async call(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.call(userId);
    const playerPrivateInfo = table.getPlayerPrivateInfo(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'call',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async check(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.check(userId);
    const playerPrivateInfo = table.getPlayerPrivateInfo(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'check',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async fold(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.fold(userId);
    const playerPrivateInfo = table.getPlayerPrivateInfo(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'fold',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async bet(tableIdStr: string, userIdStr: string, amountStr: number): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.bet(userId, new BetAmount(amountStr));
    const playerPrivateInfo = table.getPlayerPrivateInfo(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'bet',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async raise(tableIdStr: string, userIdStr: string, amountStr: number): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.raise(userId, new RaiseAmount(amountStr));
    const playerPrivateInfo = table.getPlayerPrivateInfo(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'raise',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async addOn(tableIdStr: string, userIdStr: string, amountStr: number): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.addOn(userId, new AddOnAmount(amountStr));
    const playerPrivateInfo = table.getPlayerPrivateInfo(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: 'addOn',
      payload: { table: new TableData(table), private: new PlayerPrivateInfoData(playerPrivateInfo) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }
}
