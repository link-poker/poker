import { User } from '../../domain/entities/User';
import { IUserResponse } from '../interfaces/response/IUserResponse';

export class UserData implements IUserResponse {
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
