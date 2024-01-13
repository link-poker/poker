import { SeatNumber } from '../value-objects/SeatNumber';
import { Stack } from '../value-objects/Stack';
import { Ulid } from '../value-objects/Ulid';
import { UserName } from '../value-objects/UserName';
import { UserStatus } from '../value-objects/UserStatus';

export class User {
  constructor(
    public readonly id: Ulid,
    public readonly name: UserName,
    public readonly stack: Stack,
    public readonly seatNumber: SeatNumber | null,
    public readonly status: UserStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
