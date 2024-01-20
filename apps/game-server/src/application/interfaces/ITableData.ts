import { IUserData } from './IUserData';

export interface ITableData {
  id: string;
  user: IUserData;
  currency: string;
  smallBlind: number;
  bigBlind: number;
  buyIn: number;
  createdAt: Date;
  updatedAt: Date;
}
