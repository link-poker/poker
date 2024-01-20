import { Table } from '../../domain/entities/Table';
import { ITableData } from '../interfaces/ITableData';
import { IUserData } from '../interfaces/IUserData';
import { UserData } from './userData';

export class TableData implements ITableData {
  id: string;
  user: IUserData;
  currency: string;
  smallBlind: number;
  bigBlind: number;
  buyIn: number;
  createdAt: Date;
  updatedAt: Date;

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
