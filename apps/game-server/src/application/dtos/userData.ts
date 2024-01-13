import { User } from '../../domain/entities/User';

export class UserData {
  private id: string;
  private name: string;
  private stack: number;
  private seatNumber?: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(user: User) {
    this.id = user.id.get();
    this.name = user.name;
    this.stack = user.stack;
    this.seatNumber = user.seatNumber?.get();
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
