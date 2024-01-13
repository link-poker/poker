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
    this.currency = table.currency.get();
    this.smallBlind = table.smallBlind.get();
    this.bigBlind = table.bigBlind.get();
    this.buyIn = table.buyIn.get();
    this.createdAt = table.createdAt;
    this.updatedAt = table.updatedAt;
  }
}
