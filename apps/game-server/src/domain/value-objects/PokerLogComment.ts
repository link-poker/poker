import { z } from 'zod';
import { ValidationError } from '../../error';
import { PokerLogType, PokerLogTypeEnum } from './PokerLogType';

export type StartingHandCommentParams = {
  dealerName: string;
};

export type StackCommentParams = {
  playerName: string;
  stack: number;
}[];

export type FlopCommentParams = {
  card1: string;
  card2: string;
  card3: string;
};

export type TurnCommentParams = {
  card1: string;
  card2: string;
  card3: string;
  card4: string;
};

export type RiverCommentParams = {
  card1: string;
  card2: string;
  card3: string;
  card4: string;
  card5: string;
};

export type ShowDownCommentParams = {
  playerName: string;
  hand: string;
};

export type CollectPotCommentParams = {
  playerName: string;
  amount: number;
}[];

export type EndingHandCommentParams = null;

export type smallBlindCommentParams = {
  playerName: string;
  amount: number;
};

export type bigBlindCommentParams = {
  playerName: string;
  amount: number;
};

export type BetCommentParams = {
  playerName: string;
  amount: number;
};

export type CallCommentParams = {
  playerName: string;
};

export type CheckCommentParams = {
  playerName: string;
};

export type RaiseCommentParams = {
  playerName: string;
  amount: number;
};

export type FoldCommentParams = {
  playerName: string;
};

export type CommentParams =
  | StartingHandCommentParams
  | StackCommentParams
  | FlopCommentParams
  | TurnCommentParams
  | RiverCommentParams
  | ShowDownCommentParams
  | CollectPotCommentParams
  | EndingHandCommentParams
  | smallBlindCommentParams
  | bigBlindCommentParams
  | BetCommentParams
  | CallCommentParams
  | CheckCommentParams
  | RaiseCommentParams
  | FoldCommentParams;

export class PokerLogComment {
  private readonly value: string;

  private constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Currency.');
    }
    this.value = value;
  }

  static init(type: PokerLogType, params: CommentParams): PokerLogComment {
    return new PokerLogComment(getComment(type, params));
  }

  get(): string {
    return this.value;
  }

  equals(other: PokerLogComment): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.string().min(1).safeParse(value).success;
  }
}

const getComment = (type: PokerLogType, params: CommentParams): string => {
  switch (type.get()) {
    case PokerLogTypeEnum.STARTING_HAND:
      return startingHand(params as StartingHandCommentParams);
    case PokerLogTypeEnum.STACK:
      return stack(params as StackCommentParams);
    case PokerLogTypeEnum.FLOP:
      return flop(params as FlopCommentParams);
    case PokerLogTypeEnum.TURN:
      return turn(params as TurnCommentParams);
    case PokerLogTypeEnum.RIVER:
      return river(params as RiverCommentParams);
    case PokerLogTypeEnum.SHOW_DOWN:
      return showDown(params as ShowDownCommentParams);
    case PokerLogTypeEnum.COLLECT_POT:
      return collectPot(params as CollectPotCommentParams);
    case PokerLogTypeEnum.ENDING_HAND:
      return endingHand(params as EndingHandCommentParams);
    case PokerLogTypeEnum.SMALL_BLIND:
      return smallBlind(params as smallBlindCommentParams);
    case PokerLogTypeEnum.BIG_BLIND:
      return bigBlind(params as bigBlindCommentParams);
    case PokerLogTypeEnum.BET:
      return bet(params as BetCommentParams);
    case PokerLogTypeEnum.CALL:
      return call(params as CallCommentParams);
    case PokerLogTypeEnum.CHECK:
      return check(params as CheckCommentParams);
    case PokerLogTypeEnum.RAISE:
      return raise(params as RaiseCommentParams);
    case PokerLogTypeEnum.FOLD:
      return fold(params as FoldCommentParams);
    default:
      return 'Unknown Comment';
  }
};

const startingHand = (params: StartingHandCommentParams): string => {
  return `Starting hand dealer: ${params.dealerName}`;
};

const stack = (params: StackCommentParams): string => {
  return `Stacks: ${params.map(p => `${p.playerName}: ${p.stack}`).join(', ')}`;
};

const flop = (params: FlopCommentParams): string => {
  return `Flop: ${params.card1}, ${params.card2}, ${params.card3}`;
};

const turn = (params: TurnCommentParams): string => {
  return `Turn: ${params.card4}`;
};

const river = (params: RiverCommentParams): string => {
  return `River: ${params.card5}`;
};

const showDown = (params: ShowDownCommentParams): string => {
  return `${params.playerName} show down: ${params.hand}`;
};

const collectPot = (params: CollectPotCommentParams): string => {
  return `Collect pot: ${params.map(p => `${p.playerName}: ${p.amount}`).join(', ')}`;
};

const endingHand = (params: EndingHandCommentParams): string => {
  return 'Ending hand';
};

const smallBlind = (params: smallBlindCommentParams): string => {
  return `${params.playerName} small blind: ${params.amount}`;
};

const bigBlind = (params: bigBlindCommentParams): string => {
  return `${params.playerName} big blind: ${params.amount}`;
};

const bet = (params: BetCommentParams): string => {
  return `${params.playerName} bet: ${params.amount}`;
};

const call = (params: CallCommentParams): string => {
  return `${params.playerName} call`;
};

const check = (params: CheckCommentParams): string => {
  return `${params.playerName} check`;
};

const raise = (params: RaiseCommentParams): string => {
  return `${params.playerName} raise: ${params.amount}`;
};

const fold = (params: FoldCommentParams): string => {
  return `${params.playerName} fold`;
};
