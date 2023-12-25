import { PrismaClient } from '@prisma/client';
import { UserTransformer } from '../transformers/UserTransformer';
import { User } from '../../domain/entities/User';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(user: User) {
    await this.prisma.user.create({
      data: UserTransformer.toPrismaModel(user),
    });
    return user;
  }
}
