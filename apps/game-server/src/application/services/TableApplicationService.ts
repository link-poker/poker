import { MessageTypeEnum } from '../../config/websocket';
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

  getTable(tableIdStr: string): Promise<Table> {
    const tableId = new Ulid(tableIdStr);
    return this.tableRepository.findById(tableId);
  }

  async enter(tableIdStr: string, user: User): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.ENTER,
      payload: { user: user },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
  }

  async dealCards(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    table.dealCards();
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.DEAL_CARDS,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  async sitDown(tableIdStr: string, user: User, stackNum: number, seatNumberNum: number): Promise<Table> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const stack = new Stack(stackNum);
    const seatNumber = new SeatNumber(seatNumberNum);
    table.sitDown(user, stack, seatNumber);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.SIT_DOWN,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
    return table;
  }

  async standUp(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.standUp(userId);
    // already left the table, so no need to send private info
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.STAND_UP,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  async call(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.call(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.CALL,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  async check(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.check(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.CHECK,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  async fold(tableIdStr: string, userIdStr: string): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.fold(userId);
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.FOLD,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  async bet(tableIdStr: string, userIdStr: string, amountStr: number): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.bet(userId, new BetAmount(amountStr));
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.BET,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  async raise(tableIdStr: string, userIdStr: string, amountStr: number): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.raise(userId, new RaiseAmount(amountStr));
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.RAISE,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  async addOn(tableIdStr: string, userIdStr: string, amountStr: number): Promise<void> {
    const tableId = new Ulid(tableIdStr);
    const table = await this.tableRepository.findById(tableId);
    const userId = new Ulid(userIdStr);
    table.addOn(userId, new AddOnAmount(amountStr));
    await this.tableRepository.update(table);
    const broadcastMessage = JSON.stringify({
      type: MessageTypeEnum.ADD_ON,
      payload: { table: new TableData(table) },
    });
    this.webSocketService.broadcastMessage(tableId, broadcastMessage);
    this.sendPlayerPrivateInfos(table);
  }

  private sendPlayerPrivateInfos(table: Table) {
    const playerPrivateInfos = table.getPlayerPrivateInfos();
    playerPrivateInfos.forEach(playerPrivateInfo => {
      this.webSocketService.sendMessage(
        table.id,
        playerPrivateInfo.userId,
        JSON.stringify({
          type: MessageTypeEnum.PLAYER_PRIVATE_INFO,
          payload: { playerPrivateInfo: new PlayerPrivateInfoData(playerPrivateInfo.privateInfo) },
        }),
      );
    });
  }
}
