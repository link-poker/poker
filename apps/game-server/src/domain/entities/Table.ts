import { Ulid } from '../value-objects/Ulid';
import { User } from './User';

export class Table {
  constructor(
    public readonly id: Ulid,
    public readonly user: User,
    public readonly currency: string,
    public readonly smallBlind: number,
    public readonly bigBlind: number,
    public readonly buyIn: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
