import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../../domain/entities/User';
import { Ulid } from '../../../../domain/value-objects/Ulid';
import { UserStatus } from '../../../../domain/value-objects/UserStatus';
import { SeatNumber } from '../../../../domain/value-objects/SeatNumber';

export class UserTransformer {
  static toModel(PrismaUser: PrismaUser): User {
    return new User(
      new Ulid(PrismaUser.id),
      PrismaUser.name,
      PrismaUser.stack,
      PrismaUser.seatNumber ? new SeatNumber(PrismaUser.seatNumber) : null,
      new UserStatus(PrismaUser.status),
      PrismaUser.createdAt,
      PrismaUser.updatedAt,
    );
  }

  static toPrismaModel(user: User): PrismaUser {
    return {
      id: user.id.get(),
      name: user.name,
      stack: user.stack,
      seatNumber: user.seatNumber?.get() ?? null,
      status: user.status.get(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
