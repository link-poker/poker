import { ValidationError } from '../../error';
import { Card } from '../core/Card';
import { Player, PlayerInfoForOthers, PlayerPrivateInfo } from '../core/Player';
import { Poker } from '../core/Poker';
import { Pot } from '../core/Pot';
import { TableLogFactory } from '../factories/TableLogFactory';
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
import { TableStatus } from '../value-objects/TableStatus';
import { Ulid } from '../value-objects/Ulid';
import { TableLog } from './TableLog';
import { User } from './User';

export type TableInfoForPlayers = {
  id: Ulid;
  owner: User;
  currency: Currency;
  status: TableStatus;
  createdAt: Date;
  updatedAt: Date;
  poker: {
    gameId: Ulid | null;
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
    winners: PlayerInfoForOthers[] | null;
  };
};

export class Table {
  // createdAt is not fully reliable to generate sequence number for log because it's not guaranteed to be unique.
  private sequenceForLog = 0;
  constructor(
    public id: Ulid,
    public owner: User,
    public currency: Currency,
    public status: TableStatus,
    public createdAt: Date,
    public updatedAt: Date,
    private poker: Poker,
  ) {}

  getSequenceForLog(): number {
    return this.sequenceForLog++;
  }

  getPokerState(): string {
    return JSON.stringify(this.poker.toState());
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
      id: this.id,
      owner: this.owner,
      currency: this.currency,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      poker: {
        gameId: this.gameId(),
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
        winners: this.winners()?.map(player => player.infoForOthers) || null,
      },
    };
  }

  getPlayer(userId: Ulid): Player | null {
    return this.poker.players.find(player => player?.id === userId.get()) || null;
  }

  gameId(): Ulid | null {
    return this.poker.gameId ? new Ulid(this.poker.gameId) : null;
  }

  ensurerGameId(): Ulid {
    if (!this.poker.gameId) throw new ValidationError('Not dealing cards yet. No game id.');
    return new Ulid(this.poker.gameId);
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
    return this.poker.currentRound;
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

  winners(): Player[] | null {
    return this.poker.winners || null;
  }

  // moveDealer(): void {
  //   this.poker.moveDealer;
  // }

  sitDown(user: User, stack: Stack, seatNumber: SeatNumber): void {
    this.poker.sitDown(user.id.get(), user.name.get(), stack.get(), seatNumber.get());
  }

  standUp(userId: Ulid): void {
    this.poker.standUp(userId.get());
    if (!this.poker.currentRound) {
      this.status = new TableStatus('WAITING');
    }
  }

  away(userId: Ulid): TableLog[] {
    const logs = [];
    if (this.poker.currentRound) {
      logs.push(
        TableLogFactory.createFoldLog(
          this.id,
          this.ensurerGameId(),
          {
            playerName: this.getPlayer(userId)!.name,
          },
          this.getSequenceForLog(),
        ),
      );
    }
    this.poker.away(userId.get());
    return [...this.generateTableLog(this.currentRound())];
  }

  back(userId: Ulid): void {
    this.poker.back(userId.get());
  }

  dealCards(): TableLog[] {
    const preRound = this.currentRound();
    this.status = new TableStatus('PLAYING');
    const gameId = Ulid.create();
    this.poker.dealCards(gameId.get());
    const startingHandLog = TableLogFactory.createStartingHandLog(
      this.id,
      gameId,
      {
        dealerName: this.dealer.name,
      },
      this.getSequenceForLog(),
    );
    const stackLog = TableLogFactory.createStackLog(
      this.id,
      gameId,
      this.activePlayers().map(player => {
        return { playerName: player.name, stack: player.stackSize };
      }),
      this.getSequenceForLog(),
    );
    const smallBlindLog = TableLogFactory.createSmallBlindLog(
      this.id,
      gameId,
      {
        playerName: this.smallBlindPlayer()!.name,
        amount: this.smallBlind().get(),
      },
      this.getSequenceForLog(),
    );
    const bigBlindLog = TableLogFactory.createBigBlindLog(
      this.id,
      gameId,
      {
        playerName: this.bigBlindPlayer()!.name,
        amount: this.bigBlind().get(),
      },
      this.getSequenceForLog(),
    );
    return [startingHandLog, stackLog, smallBlindLog, bigBlindLog, ...this.generateTableLog(preRound)];
  }

  addOn(userId: Ulid, amount: AddOnAmount): void {
    this.poker.addOn(userId.get(), amount.get());
  }

  call(userId: Ulid): TableLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.callAction();
    const callLog = TableLogFactory.createCallLog(
      this.id,
      this.ensurerGameId(),
      {
        playerName: this.getPlayer(userId)!.name,
      },
      this.getSequenceForLog(),
    );
    return [callLog, ...this.generateTableLog(preRound)];
  }

  check(userId: Ulid): TableLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.checkAction();
    const checkLog = TableLogFactory.createCheckLog(
      this.id,
      this.ensurerGameId(),
      {
        playerName: this.getPlayer(userId)!.name,
      },
      this.getSequenceForLog(),
    );
    return [checkLog, ...this.generateTableLog(preRound)];
  }

  fold(userId: Ulid): TableLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.foldAction();
    const foldLog = TableLogFactory.createFoldLog(
      this.id,
      this.ensurerGameId(),
      {
        playerName: this.getPlayer(userId)!.name,
      },
      this.getSequenceForLog(),
    );
    return [foldLog, ...this.generateTableLog(preRound)];
  }

  bet(userId: Ulid, amount: BetAmount): TableLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.betAction(amount.get());
    const betLog = TableLogFactory.createBetLog(
      this.id,
      this.ensurerGameId(),
      {
        playerName: this.poker.currentActor!.name,
        amount: amount.get(),
      },
      this.getSequenceForLog(),
    );
    return [betLog, ...this.generateTableLog(preRound)];
  }

  raise(userId: Ulid, amount: RaiseAmount): TableLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.raiseAction(amount.get());
    const raiseLog = TableLogFactory.createRaiseLog(
      this.id,
      this.ensurerGameId(),
      {
        playerName: this.poker.currentActor!.name,
        amount: amount.get(),
      },
      this.getSequenceForLog(),
    );
    return [raiseLog, ...this.generateTableLog(preRound)];
  }

  private ensureYourTurn(userId: Ulid): void {
    if (!this.poker.currentActor) throw new ValidationError('No current actor');
    if (this.poker.currentActor?.id !== userId.get()) {
      throw new ValidationError(
        `It's not your turn. Current actor: ${this.poker.currentActor?.name} id: ${this.poker.currentActor?.id}`,
      );
    }
  }

  private generateTableLog(preRound: BettingRound | null): TableLog[] {
    const round = this.currentRound();
    if (preRound === round) return [];
    if (!round) {
      return [
        ...this.actingPlayers().map((player: Player) => {
          return TableLogFactory.createShowDownLog(
            this.id,
            this.ensurerGameId(),
            {
              playerName: player.name,
              hand: player.hand.name,
            },
            this.getSequenceForLog(),
          );
        }),
        TableLogFactory.createCollectPotLog(
          this.id,
          this.ensurerGameId(),
          this.winners()!.map(player => {
            return { playerName: player.name, amount: player.stackSize };
          }),
          this.getSequenceForLog(),
        ),
        TableLogFactory.createEndingHandLog(this.id, this.ensurerGameId(), null, this.getSequenceForLog()),
      ];
    }
    switch (round.get()) {
      case 'FLOP':
        return [
          TableLogFactory.createFlopLog(
            this.id,
            this.ensurerGameId(),
            {
              card1: this.commonCards()[0].toString(),
              card2: this.commonCards()[1].toString(),
              card3: this.commonCards()[2].toString(),
            },
            this.getSequenceForLog(),
          ),
        ];
      case 'TURN':
        return [
          TableLogFactory.createTurnLog(
            this.id,
            this.ensurerGameId(),
            {
              card1: this.commonCards()[0].toString(),
              card2: this.commonCards()[1].toString(),
              card3: this.commonCards()[2].toString(),
              card4: this.commonCards()[3].toString(),
            },
            this.getSequenceForLog(),
          ),
        ];
      case 'RIVER':
        return [
          TableLogFactory.createRiverLog(
            this.id,
            this.ensurerGameId(),
            {
              card1: this.commonCards()[0].toString(),
              card2: this.commonCards()[1].toString(),
              card3: this.commonCards()[2].toString(),
              card4: this.commonCards()[3].toString(),
              card5: this.commonCards()[4].toString(),
            },
            this.getSequenceForLog(),
          ),
        ];
      default:
        return [];
    }
  }
}
