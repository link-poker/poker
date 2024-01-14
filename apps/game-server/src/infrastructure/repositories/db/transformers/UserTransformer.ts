import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../../domain/entities/User';
import { Ulid } from '../../../../domain/value-objects/Ulid';
import { UserStatus } from '../../../../domain/value-objects/UserStatus';
import { UserName } from '../../../../domain/value-objects/UserName';

export class UserTransformer {
  static toModel(PrismaUser: PrismaUser): User {
    return new User(
      new Ulid(PrismaUser.id),
      new UserName(PrismaUser.name),
      new UserStatus(PrismaUser.status),
      PrismaUser.createdAt,
      PrismaUser.updatedAt,
    );
  }

  static toPrismaModel(user: User): PrismaUser {
    return {
      id: user.id.get(),
      name: user.name.get(),
      status: user.status.get(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
