import { IUserResponse } from '@link-poker/constants';
import { User } from '../../domain/entities/User';

export class UserData implements IUserResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: User) {
    this.id = user.id.get();
    this.name = user.name.get();
    this.createdAt = user.createdAt.toISOString();
    this.updatedAt = user.updatedAt.toISOString();
  }
}
