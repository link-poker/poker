import { PokerLogComment } from '../value-objects/PokerLogComment';
import { PokerLogType } from '../value-objects/PokerLogType';
import { Ulid } from '../value-objects/Ulid';

export class PokerLog {
  constructor(
    public readonly id: Ulid,
    public readonly tableId: Ulid,
    public readonly gameId: Ulid,
    public readonly type: PokerLogType,
    public readonly params: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  getPokerLogComment(): PokerLogComment {
    const params = JSON.parse(this.params);
    const pokerLogComment = PokerLogComment.init(this.type, params);
    return pokerLogComment;
  }
}
