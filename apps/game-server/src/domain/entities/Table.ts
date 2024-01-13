import { Ulid } from '../value-objects/Ulid';
import { User } from './User';
import { Poker, Pot } from '../core/Poker';
import { Player } from '../core/Player';
import { TableStatus } from '../value-objects/TableStatus';
import { Card } from '../core/Card';
import { ValidationError } from '../../error';

export class Table {
  private poker: Poker;

  constructor(
    public readonly id: Ulid,
    public readonly user: User,
    public readonly currency: string,
    public readonly smallBlind: number,
    public readonly bigBlind: number,
    public readonly buyIn: number,
    public readonly status: TableStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.poker = new Poker(buyIn, smallBlind, bigBlind);
  }

  setPokerState(pokerState: string) {
    const pokerStateJson = JSON.parse(pokerState);
    this.poker.restoreState(pokerStateJson);
  }

  getPokerState(): string {
    return JSON.stringify(this.poker.extractState());
  }

  getTableInfoForPlayers(): any {
    return {
      id: this.id.get(),
      user: this.user,
      currency: this.currency,
      smallBlind: this.smallBlind,
      bigBlind: this.bigBlind,
      buyIn: this.buyIn,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      poker: {
        actingPlayers: this.getActingPlayers().map(player => player.infoForOthers),
        activePlayers: this.getActivePlayers().map(player => player.infoForOthers),
        bigBlindPlayer: this.bigBlindPlayer()?.infoForOthers,
        currentActor: this.currentActor()?.infoForOthers,
        currentPot: this.currentPot(),
        dealer: this.dealer()?.infoForOthers,
        lastActor: this.lastActor()?.infoForOthers,
        sidePots: this.sidePots(),
        smallBlindPlayer: this.smallBlindPlayer()?.infoForOthers,
      },
    };
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

  sitDown(user: User): void {
    this.poker.sitDown(user.id.get(), user.stack, user.seatNumber?.get());
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
