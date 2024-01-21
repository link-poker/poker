import { Ulid } from '../value-objects/Ulid';
import { User } from './User';
import { Poker, Pot } from '../core/Poker';
import { Player, PlayerInfoForOthers } from '../core/Player';
import { TableStatus } from '../value-objects/TableStatus';
import { Card } from '../core/Card';
import { ValidationError } from '../../error';
import { Currency } from '../value-objects/Currency';
import { SeatNumber } from '../value-objects/SeatNumber';
import { Stack } from '../value-objects/Stack';

export type TableInfoForPlayers = {
  id: string;
  owner: User;
  currency: Currency;
  status: TableStatus;
  createdAt: Date;
  updatedAt: Date;
  poker: {
    bigBlind: number;
    smallBlind: number;
    buyIn: number;
    actingPlayers: PlayerInfoForOthers[];
    activePlayers: PlayerInfoForOthers[];
    bigBlindPlayer: PlayerInfoForOthers | null;
    currentActor: PlayerInfoForOthers | null;
    currentPot: Pot | null;
    dealer: PlayerInfoForOthers | null;
    lastActor: PlayerInfoForOthers | null;
    sidePots: Pot[];
    smallBlindPlayer: PlayerInfoForOthers | null;
  };
};

export class Table {
  constructor(
    public readonly id: Ulid,
    public readonly owner: User,
    public readonly currency: Currency,
    public readonly status: TableStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    private poker: Poker,
  ) {}

  getPokerState(): string {
    return JSON.stringify(this.poker.extractState());
  }

  getTableInfoForPlayers(): TableInfoForPlayers {
    return {
      id: this.id.get(),
      owner: this.owner,
      currency: this.currency,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      poker: {
        bigBlind: this.getBigBlind(),
        smallBlind: this.getSmallBlind(),
        buyIn: this.getBuyIn(),
        actingPlayers: this.getActingPlayers().map(player => player.infoForOthers),
        activePlayers: this.getActivePlayers().map(player => player.infoForOthers),
        bigBlindPlayer: this.bigBlindPlayer()?.infoForOthers || null,
        currentActor: this.currentActor()?.infoForOthers || null,
        currentPot: this.currentPot() || null,
        dealer: this.dealer()?.infoForOthers || null,
        lastActor: this.lastActor()?.infoForOthers || null,
        sidePots: this.sidePots(),
        smallBlindPlayer: this.smallBlindPlayer()?.infoForOthers || null,
      },
    };
  }

  getBigBlind(): number {
    return this.poker.bigBlind;
  }

  getSmallBlind(): number {
    return this.poker.smallBlind;
  }

  getBuyIn(): number {
    return this.poker.buyIn;
  }

  getActingPlayers(): Player[] {
    return this.poker.actingPlayers;
  }

  getActivePlayers(): Player[] {
    return this.poker.activePlayers;
  }

  bigBlindPlayer(): Player | null {
    return this.poker.bigBlindPlayer;
  }

  currentActor(): Player | null {
    return this.poker.currentActor;
  }

  currentPot(): Pot | null {
    return this.poker.currentPot;
  }

  dealer(): Player | null {
    return this.poker.dealer;
  }

  lastActor(): Player | null {
    return this.poker.lastActor;
  }

  sidePots(): Pot[] {
    return this.poker.sidePots;
  }

  smallBlindPlayer(): Player | null {
    return this.poker.smallBlindPlayer;
  }

  moveDealer(): void {
    this.poker.moveDealer;
  }

  sitDown(user: User, stack: Stack, seatNumber: SeatNumber): void {
    this.poker.sitDown(user.id.get(), stack.get(), seatNumber.get());
  }

  standUp(userId: string): void {
    this.poker.standUp(userId);
  }

  cleanUp(): void {
    this.poker.cleanUp();
  }

  dealCards(): void {
    this.poker.dealCards();
  }

  nextAction(): void {
    this.poker.nextAction();
  }

  gatherBets(): void {
    this.poker.gatherBets();
  }

  nextRound(): void {
    this.poker.nextRound();
  }

  showdown(): void {
    this.poker.showdown();
  }

  newDeck(): Card[] {
    return this.poker.newDeck();
  }

  addOn(userId: string, amount: number): void {
    this.poker.addOn(userId, amount);
  }

  call(userId: string): void {
    if (this.poker.currentActor?.id !== userId) throw new ValidationError('Not your turn');
    this.poker.currentActor.callAction();
  }

  check(userId: string): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.checkAction();
  }

  fold(userId: string): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.foldAction();
  }

  bet(userId: string, amount: number): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.betAction(amount);
  }

  raise(userId: string, amount: number): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.raiseAction(amount);
  }

  private ensureYourTurn(userId: string): void {
    if (this.poker.currentActor?.id === userId) throw new ValidationError('Not your turn');
  }
}
