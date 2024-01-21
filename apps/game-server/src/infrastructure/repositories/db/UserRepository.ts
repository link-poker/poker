import { PrismaClient } from '@prisma/client';
import { UserTransformer } from './transformers/UserTransformer';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../interfaces/repository/IUserRepository';
import { NotFoundError } from '../../../error';
import { Ulid } from '../../../domain/value-objects/Ulid';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: Ulid): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: id.get() } });
    if (!user) throw new NotFoundError(`User not found for id ${id.get()}`);
    return UserTransformer.toModel(user);
  }

  async create(user: User) {
    await this.prisma.user.create({
      data: UserTransformer.toPrismaModel(user),
    });
    return user;
  }
}
