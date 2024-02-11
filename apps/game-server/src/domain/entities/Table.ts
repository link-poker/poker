import { ValidationError } from '../../error';
import { Card } from '../core/Card';
import { Player, PlayerInfoForOthers, PlayerPrivateInfo } from '../core/Player';
import { Poker, Pot } from '../core/Poker';
import { AddOnAmount } from '../value-objects/AddOnAmount';
import { BetAmount } from '../value-objects/BetAmount';
import { BettingRound } from '../value-objects/BettingRound';
import { BigBlind } from '../value-objects/BigBlind';
import { BuyIn } from '../value-objects/BuyIn';
import { Currency } from '../value-objects/Currency';
import { CurrentBet } from '../value-objects/CurrentBet';
import { RaiseAmount } from '../value-objects/RaiseAmount';
import { SeatNumber } from '../value-objects/SeatNumber';
import { SmallBlind } from '../value-objects/SmallBlind';
import { Stack } from '../value-objects/Stack';
import { TableStatus, TableStatusEnum } from '../value-objects/TableStatus';
import { Ulid } from '../value-objects/Ulid';
import { User } from './User';

export type TableInfoForPlayers = {
  id: string;
  owner: User;
  currency: Currency;
  status: TableStatus;
  createdAt: Date;
  updatedAt: Date;
  poker: {
    bigBlind: BigBlind;
    smallBlind: SmallBlind;
    buyIn: BuyIn;
    players: (PlayerInfoForOthers | null)[]; // array of 10
    actingPlayers: PlayerInfoForOthers[];
    activePlayers: PlayerInfoForOthers[];
    currentActor: PlayerInfoForOthers | null;
    currentRound: BettingRound | null;
    currentBet: CurrentBet | null;
    currentPot: Pot | null;
    dealer: PlayerInfoForOthers | null;
    lastActor: PlayerInfoForOthers | null;
    sidePots: Pot[];
    smallBlindPlayer: PlayerInfoForOthers | null;
    bigBlindPlayer: PlayerInfoForOthers | null;
    commonCards: string[];
  };
};

export class Table {
  constructor(
    public id: Ulid,
    public owner: User,
    public currency: Currency,
    public status: TableStatus,
    public createdAt: Date,
    public updatedAt: Date,
    private poker: Poker,
  ) {}

  getPokerState(): string {
    return JSON.stringify(this.poker.extractState());
  }

  getPlayerPrivateInfo(userId: Ulid): PlayerPrivateInfo | null {
    const player = this.poker.players.find(player => player?.id === userId.get());
    if (!player) return null;
    return player.privateInfo;
  }

  getPlayerPrivateInfos(): { userId: Ulid; privateInfo: PlayerPrivateInfo }[] {
    const playerPrivateInfos: { userId: Ulid; privateInfo: PlayerPrivateInfo }[] = [];
    this.poker.players.forEach(player => {
      if (player) {
        playerPrivateInfos.push({ userId: new Ulid(player.id), privateInfo: player.privateInfo });
      }
    });
    return playerPrivateInfos;
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
        bigBlind: this.bigBlind(),
        smallBlind: this.smallBlind(),
        buyIn: this.buyIn(),
        players: this.poker.players.map(player => player?.infoForOthers || null),
        actingPlayers: this.actingPlayers().map(player => player.infoForOthers),
        activePlayers: this.activePlayers().map(player => player.infoForOthers),
        currentActor: this.currentActor()?.infoForOthers || null,
        currentRound: this.currentRound(),
        currentBet: this.currentBet() || null,
        currentPot: this.currentPot() || null,
        dealer: this.dealer()?.infoForOthers || null,
        lastActor: this.lastActor()?.infoForOthers || null,
        sidePots: this.sidePots(),
        smallBlindPlayer: this.smallBlindPlayer()?.infoForOthers || null,
        bigBlindPlayer: this.bigBlindPlayer()?.infoForOthers || null,
        commonCards: this.commonCards().map(card => card.toString()),
      },
    };
  }

  bigBlind(): BigBlind {
    return new BigBlind(this.poker.bigBlind);
  }

  smallBlind(): SmallBlind {
    return new SmallBlind(this.poker.smallBlind);
  }

  buyIn(): BuyIn {
    return new BuyIn(this.poker.buyIn);
  }

  actingPlayers(): Player[] {
    return this.poker.actingPlayers;
  }

  activePlayers(): Player[] {
    return this.poker.activePlayers;
  }

  currentActor(): Player | null {
    return this.poker.currentActor;
  }

  currentRound(): BettingRound | null {
    if (!this.poker.currentRound) return null;
    return new BettingRound(this.poker.currentRound);
  }

  currentBet(): CurrentBet | null {
    if (!this.poker.currentBet) return null;
    return new CurrentBet(this.poker.currentBet);
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

  bigBlindPlayer(): Player | null {
    return this.poker.bigBlindPlayer;
  }

  commonCards(): Card[] {
    return this.poker.communityCards;
  }

  moveDealer(): void {
    this.poker.moveDealer;
  }

  sitDown(user: User, stack: Stack, seatNumber: SeatNumber): void {
    this.poker.sitDown(user.id.get(), user.name.get(), stack.get(), seatNumber.get());
  }

  standUp(userId: Ulid): void {
    this.poker.standUp(userId.get());
    if (!this.poker.currentRound) {
      this.status = new TableStatus(TableStatusEnum.WAITING);
    }
  }

  cleanUp(): void {
    this.poker.cleanUp();
  }

  dealCards(): void {
    this.status = new TableStatus(TableStatusEnum.PLAYING);
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

  addOn(userId: Ulid, amount: AddOnAmount): void {
    this.poker.addOn(userId.get(), amount.get());
  }

  call(userId: Ulid): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.callAction();
  }

  check(userId: Ulid): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.checkAction();
  }

  fold(userId: Ulid): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.foldAction();
  }

  bet(userId: Ulid, amount: BetAmount): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.betAction(amount.get());
  }

  raise(userId: Ulid, amount: RaiseAmount): void {
    this.ensureYourTurn(userId);
    this.poker.currentActor!.raiseAction(amount.get());
  }

  private ensureYourTurn(userId: Ulid): void {
    if (!this.poker.currentActor) throw new ValidationError('No current actor');
    if (this.poker.currentActor?.id !== userId.get()) {
      throw new ValidationError(
        `It's not your turn. Current actor: ${this.poker.currentActor?.name} id: ${this.poker.currentActor?.id}`,
      );
    }
  }
}
