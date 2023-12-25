import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/User';
import { Ulid } from '../../domain/value-objects/Ulid';

export class UserTransformer {
  static toModel(PrismaUser: PrismaUser): User {
    return new User(
      new Ulid(PrismaUser.id),
      PrismaUser.name,
      PrismaUser.password,
      PrismaUser.createdAt,
      PrismaUser.updatedAt,
    );
  }

  static toPrismaModel(user: User): PrismaUser {
    return {
      id: user.id.get(),
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
