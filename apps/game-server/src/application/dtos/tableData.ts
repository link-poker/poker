import { Table } from '../../domain/entities/Table';
import { UserData } from './userData';

export class TableData {
  private id: string;
  private user: UserData;
  private currency: string;
  private smallBlind: number;
  private bigBlind: number;
  private buyIn: number;
  private createdAt: Date;
  private updatedAt: Date;
  constructor(table: Table) {
    this.id = table.id.get();
    this.user = new UserData(table.user);
    this.currency = table.currency;
    this.smallBlind = table.smallBlind;
    this.bigBlind = table.bigBlind;
    this.buyIn = table.buyIn;
    this.createdAt = table.createdAt;
    this.updatedAt = table.updatedAt;
  }
}
