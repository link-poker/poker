import { TableLog } from '../entities/TableLog';
import {
  BetCommentParams,
  CallCommentParams,
  CheckCommentParams,
  CollectPotCommentParams,
  CommentParams,
  EndingHandCommentParams,
  FlopCommentParams,
  FoldCommentParams,
  RaiseCommentParams,
  RiverCommentParams,
  ShowDownCommentParams,
  StackCommentParams,
  StartingHandCommentParams,
  TurnCommentParams,
  bigBlindCommentParams,
  smallBlindCommentParams,
} from '../value-objects/TableLogComment';
import { TableLogType } from '../value-objects/TableLogType';
import { Ulid } from '../value-objects/Ulid';

export class TableLogFactory {
  static createStartingHandLog(tableId: Ulid, gameId: Ulid, params: StartingHandCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('STARTING_HAND'), params);
  }

  static createStackLog(tableId: Ulid, gameId: Ulid, params: StackCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('STACK'), params);
  }

  static createFlopLog(tableId: Ulid, gameId: Ulid, params: FlopCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('FLOP'), params);
  }

  static createTurnLog(tableId: Ulid, gameId: Ulid, params: TurnCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('TURN'), params);
  }

  static createRiverLog(tableId: Ulid, gameId: Ulid, params: RiverCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('RIVER'), params);
  }

  static createShowDownLog(tableId: Ulid, gameId: Ulid, params: ShowDownCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('SHOW_DOWN'), params);
  }

  static createCollectPotLog(tableId: Ulid, gameId: Ulid, params: CollectPotCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('COLLECT_POT'), params);
  }

  static createEndingHandLog(tableId: Ulid, gameId: Ulid, params: EndingHandCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('ENDING_HAND'), params);
  }

  static createSmallBlindLog(tableId: Ulid, gameId: Ulid, params: smallBlindCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('SMALL_BLIND'), params);
  }

  static createBigBlindLog(tableId: Ulid, gameId: Ulid, params: bigBlindCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('BIG_BLIND'), params);
  }

  static createBetLog(tableId: Ulid, gameId: Ulid, params: BetCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('BET'), params);
  }

  static createCallLog(tableId: Ulid, gameId: Ulid, params: CallCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('CALL'), params);
  }

  static createCheckLog(tableId: Ulid, gameId: Ulid, params: CheckCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('CHECK'), params);
  }

  static createRaiseLog(tableId: Ulid, gameId: Ulid, params: RaiseCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('RAISE'), params);
  }

  static createFoldLog(tableId: Ulid, gameId: Ulid, params: FoldCommentParams): TableLog {
    return this.create(tableId, gameId, new TableLogType('FOLD'), params);
  }

  private static create(tableId: Ulid, gameId: Ulid, type: TableLogType, params: CommentParams): TableLog {
    const paramsStr = JSON.stringify(params);
    return new TableLog(Ulid.create(), tableId, gameId, type, paramsStr, new Date(), new Date());
  }
}
