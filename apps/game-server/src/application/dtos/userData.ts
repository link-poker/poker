import { User } from '../../domain/entities/User';
import { IUserData } from '../interfaces/IUserData';

export class UserData implements IUserData {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id.get();
    this.name = user.name.get();
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
