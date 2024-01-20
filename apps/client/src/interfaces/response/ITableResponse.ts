import { IUserResponse } from './IUserResponse';

export interface ITableResponse {
  id: string;
  user: IUserResponse;
  currency: string;
  smallBlind: number;
  bigBlind: number;
  buyIn: number;
  createdAt: string;
  updatedAt: string;
}
