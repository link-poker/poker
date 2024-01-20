import { PrismaClient } from '@prisma/client';
import { UserTransformer } from './transformers/UserTransformer';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../interfaces/repository/IUserRepository';
import { NotFoundError } from '../../../error';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError(`User not found for id ${id}`);
    return UserTransformer.toModel(user);
  }

  async create(user: User) {
    await this.prisma.user.create({
      data: UserTransformer.toPrismaModel(user),
    });
    return user;
  }
}
