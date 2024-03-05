import { PokerLog } from '../entities/PokerLog';
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
} from '../value-objects/PokerLogComment';
import { PokerLogType, PokerLogTypeEnum } from '../value-objects/PokerLogType';
import { Ulid } from '../value-objects/Ulid';

export class PokerLogFactory {
  static createStartingHandLog(tableId: Ulid, gameId: Ulid, params: StartingHandCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.STARTING_HAND), params);
  }

  static createStackLog(tableId: Ulid, gameId: Ulid, params: StackCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.STACK), params);
  }

  static createFlopLog(tableId: Ulid, gameId: Ulid, params: FlopCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.FLOP), params);
  }

  static createTurnLog(tableId: Ulid, gameId: Ulid, params: TurnCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.TURN), params);
  }

  static createRiverLog(tableId: Ulid, gameId: Ulid, params: RiverCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.RIVER), params);
  }

  static createShowDownLog(tableId: Ulid, gameId: Ulid, params: ShowDownCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.SHOW_DOWN), params);
  }

  static createCollectPotLog(tableId: Ulid, gameId: Ulid, params: CollectPotCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.COLLECT_POT), params);
  }

  static createEndingHandLog(tableId: Ulid, gameId: Ulid, params: EndingHandCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.ENDING_HAND), params);
  }

  static createSmallBlindLog(tableId: Ulid, gameId: Ulid, params: smallBlindCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.SMALL_BLIND), params);
  }

  static createBigBlindLog(tableId: Ulid, gameId: Ulid, params: bigBlindCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.BIG_BLIND), params);
  }

  static createBetLog(tableId: Ulid, gameId: Ulid, params: BetCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.BET), params);
  }

  static createCallLog(tableId: Ulid, gameId: Ulid, params: CallCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.CALL), params);
  }

  static createCheckLog(tableId: Ulid, gameId: Ulid, params: CheckCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.CHECK), params);
  }

  static createRaiseLog(tableId: Ulid, gameId: Ulid, params: RaiseCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.RAISE), params);
  }

  static createFoldLog(tableId: Ulid, gameId: Ulid, params: FoldCommentParams): PokerLog {
    return this.create(tableId, gameId, new PokerLogType(PokerLogTypeEnum.FOLD), params);
  }

  private static create(tableId: Ulid, gameId: Ulid, type: PokerLogType, params: CommentParams): PokerLog {
    const paramsStr = JSON.stringify(params);
    return new PokerLog(Ulid.create(), tableId, gameId, type, paramsStr, new Date(), new Date());
  }
}
