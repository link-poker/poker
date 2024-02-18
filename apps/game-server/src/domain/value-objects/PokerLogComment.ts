import { z } from 'zod';
import { ValidationError } from '../../error';
import { PokerLogType, PokerLogTypeEnum } from './PokerLogType';

type StartingHandParams = {
  dealer: string;
};

type StackParams = {
  playerName: string;
  stack: number;
}[];

type YourHandParams = {
  hand: string;
};

type FlopParams = {
  card1: string;
  card2: string;
  card3: string;
};

type TurnParams = {
  card1: string;
  card2: string;
  card3: string;
  card4: string;
};

type RiverParams = {
  card1: string;
  card2: string;
  card3: string;
  card4: string;
  card5: string;
};

type ShowDownParams = {
  playerName: string;
  hand: string;
};

type CollectPotParams = {
  playerName: string;
  amount: number;
}[];

type EndingHandParams = null;

type smallBlindParams = {
  playerName: string;
  amount: number;
};

type bigBlindParams = {
  playerName: string;
  amount: number;
};

type BetParams = {
  playerName: string;
  amount: number;
};

type CallParams = {
  playerName: string;
};

type CheckParams = {
  playerName: string;
};

type RaiseParams = {
  playerName: string;
  amount: number;
};

type FoldParams = {
  playerName: string;
};

type CommentParams =
  | StartingHandParams
  | StackParams
  | YourHandParams
  | FlopParams
  | TurnParams
  | RiverParams
  | ShowDownParams
  | CollectPotParams
  | EndingHandParams
  | smallBlindParams
  | bigBlindParams
  | BetParams
  | CallParams
  | CheckParams
  | RaiseParams
  | FoldParams;

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
      return startingHand(params as StartingHandParams);
    case PokerLogTypeEnum.STACK:
      return stack(params as StackParams);
    case PokerLogTypeEnum.YOUR_HAND:
      return yourHand(params as YourHandParams);
    case PokerLogTypeEnum.FLOP:
      return flop(params as FlopParams);
    case PokerLogTypeEnum.TURN:
      return turn(params as TurnParams);
    case PokerLogTypeEnum.RIVER:
      return river(params as RiverParams);
    case PokerLogTypeEnum.SHOW_DOWN:
      return showDown(params as ShowDownParams);
    case PokerLogTypeEnum.COLLECT_POT:
      return collectPot(params as CollectPotParams);
    case PokerLogTypeEnum.ENDING_HAND:
      return endingHand(params as EndingHandParams);
    case PokerLogTypeEnum.SMALL_BLIND:
      return smallBlind(params as smallBlindParams);
    case PokerLogTypeEnum.BIG_BLIND:
      return bigBlind(params as bigBlindParams);
    case PokerLogTypeEnum.BET:
      return bet(params as BetParams);
    case PokerLogTypeEnum.CALL:
      return call(params as CallParams);
    case PokerLogTypeEnum.CHECK:
      return check(params as CheckParams);
    case PokerLogTypeEnum.RAISE:
      return raise(params as RaiseParams);
    case PokerLogTypeEnum.FOLD:
      return fold(params as FoldParams);
    default:
      return 'Unknown Comment';
  }
};

const startingHand = (params: StartingHandParams): string => {
  return `Starting hand dealer: ${params.dealer}`;
};

const stack = (params: StackParams): string => {
  return `Stacks: ${params.map(p => `${p.playerName}: ${p.stack}`).join(', ')}`;
};

const yourHand = (params: YourHandParams): string => {
  return `Your hand: ${params.hand}`;
};

const flop = (params: FlopParams): string => {
  return `Flop: ${params.card1}, ${params.card2}, ${params.card3}`;
};

const turn = (params: TurnParams): string => {
  return `Turn: ${params.card4}`;
};

const river = (params: RiverParams): string => {
  return `River: ${params.card5}`;
};

const showDown = (params: ShowDownParams): string => {
  return `${params.playerName} show down: ${params.hand}`;
};

const collectPot = (params: CollectPotParams): string => {
  return `Collect pot: ${params.map(p => `${p.playerName}: ${p.amount}`).join(', ')}`;
};

const endingHand = (params: EndingHandParams): string => {
  return 'Ending hand';
};

const smallBlind = (params: smallBlindParams): string => {
  return `${params.playerName} small blind: ${params.amount}`;
};

const bigBlind = (params: bigBlindParams): string => {
  return `${params.playerName} big blind: ${params.amount}`;
};

const bet = (params: BetParams): string => {
  return `${params.playerName} bet: ${params.amount}`;
};

const call = (params: CallParams): string => {
  return `${params.playerName} call`;
};

const check = (params: CheckParams): string => {
  return `${params.playerName} check`;
};

const raise = (params: RaiseParams): string => {
  return `${params.playerName} raise: ${params.amount}`;
};

const fold = (params: FoldParams): string => {
  return `${params.playerName} fold`;
};
