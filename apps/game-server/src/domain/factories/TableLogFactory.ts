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
  static createStartingHandLog(
    tableId: Ulid,
    gameId: Ulid,
    params: StartingHandCommentParams,
    sequence: number,
  ): TableLog {
    return this.create(tableId, gameId, new TableLogType('STARTING_HAND'), params, sequence);
  }

  static createStackLog(tableId: Ulid, gameId: Ulid, params: StackCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('STACK'), params, sequence);
  }

  static createFlopLog(tableId: Ulid, gameId: Ulid, params: FlopCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('FLOP'), params, sequence);
  }

  static createTurnLog(tableId: Ulid, gameId: Ulid, params: TurnCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('TURN'), params, sequence);
  }

  static createRiverLog(tableId: Ulid, gameId: Ulid, params: RiverCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('RIVER'), params, sequence);
  }

  static createShowDownLog(tableId: Ulid, gameId: Ulid, params: ShowDownCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('SHOW_DOWN'), params, sequence);
  }

  static createCollectPotLog(tableId: Ulid, gameId: Ulid, params: CollectPotCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('COLLECT_POT'), params, sequence);
  }

  static createEndingHandLog(tableId: Ulid, gameId: Ulid, params: EndingHandCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('ENDING_HAND'), params, sequence);
  }

  static createSmallBlindLog(tableId: Ulid, gameId: Ulid, params: smallBlindCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('SMALL_BLIND'), params, sequence);
  }

  static createBigBlindLog(tableId: Ulid, gameId: Ulid, params: bigBlindCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('BIG_BLIND'), params, sequence);
  }

  static createBetLog(tableId: Ulid, gameId: Ulid, params: BetCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('BET'), params, sequence);
  }

  static createCallLog(tableId: Ulid, gameId: Ulid, params: CallCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('CALL'), params, sequence);
  }

  static createCheckLog(tableId: Ulid, gameId: Ulid, params: CheckCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('CHECK'), params, sequence);
  }

  static createRaiseLog(tableId: Ulid, gameId: Ulid, params: RaiseCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('RAISE'), params, sequence);
  }

  static createFoldLog(tableId: Ulid, gameId: Ulid, params: FoldCommentParams, sequence: number): TableLog {
    return this.create(tableId, gameId, new TableLogType('FOLD'), params, sequence);
  }

  private static create(
    tableId: Ulid,
    gameId: Ulid,
    type: TableLogType,
    params: CommentParams,
    sequence: number,
  ): TableLog {
    const paramsStr = JSON.stringify(params);
    const now = new Date().getTime();
    return new TableLog(Ulid.create(), tableId, gameId, type, paramsStr, sequence, new Date(), new Date());
  }
}
