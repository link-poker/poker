import { z } from 'zod';
import { ValidationError } from '../../error';
import { TableLogType } from './TableLogType';

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

export type EndingHandCommentParams = Record<string, never>;

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

export class TableLogComment {
  private readonly value: string;

  private constructor(value: string) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid Currency.');
    }
    this.value = value;
  }

  static init(type: TableLogType, params: CommentParams): TableLogComment {
    return new TableLogComment(getComment(type, params));
  }

  get(): string {
    return this.value;
  }

  equals(other: TableLogComment): boolean {
    return this.value === other.value;
  }

  private isValid(value: string): boolean {
    return z.string().min(1).safeParse(value).success;
  }
}

const getComment = (type: TableLogType, params: CommentParams): string => {
  switch (type.get()) {
    case 'STARTING_HAND':
      return startingHand(params as StartingHandCommentParams);
    case 'STACK':
      return stack(params as StackCommentParams);
    case 'FLOP':
      return flop(params as FlopCommentParams);
    case 'TURN':
      return turn(params as TurnCommentParams);
    case 'RIVER':
      return river(params as RiverCommentParams);
    case 'SHOW_DOWN':
      return showDown(params as ShowDownCommentParams);
    case 'COLLECT_POT':
      return collectPot(params as CollectPotCommentParams);
    case 'ENDING_HAND':
      return endingHand(params as EndingHandCommentParams);
    case 'SMALL_BLIND':
      return smallBlind(params as smallBlindCommentParams);
    case 'BIG_BLIND':
      return bigBlind(params as bigBlindCommentParams);
    case 'BET':
      return bet(params as BetCommentParams);
    case 'CALL':
      return call(params as CallCommentParams);
    case 'CHECK':
      return check(params as CheckCommentParams);
    case 'RAISE':
      return raise(params as RaiseCommentParams);
    case 'FOLD':
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
