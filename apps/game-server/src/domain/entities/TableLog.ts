import { TableLogComment } from '../value-objects/TableLogComment';
import { TableLogType } from '../value-objects/TableLogType';
import { Ulid } from '../value-objects/Ulid';

export class TableLog {
  constructor(
    public readonly id: Ulid,
    public readonly tableId: Ulid,
    public readonly gameId: Ulid | null,
    public readonly type: TableLogType,
    public readonly params: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  getTableLogComment(): TableLogComment {
    const params = JSON.parse(this.params);
    const tableLogComment = TableLogComment.init(this.type, params);
    return tableLogComment;
  }
}
