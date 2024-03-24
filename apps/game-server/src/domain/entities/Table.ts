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
    gameId?: Ulid;
    bigBlind: BigBlind;
    smallBlind: SmallBlind;
    buyIn: BuyIn;
    players: (PlayerInfoForOthers | undefined)[]; // array of 10
    actingPlayers: PlayerInfoForOthers[];
    activePlayers: PlayerInfoForOthers[];
    currentActor?: PlayerInfoForOthers;
    currentRound?: BettingRound;
    currentBet?: CurrentBet;
    currentPot?: Pot;
    dealer?: PlayerInfoForOthers;
    lastActor?: PlayerInfoForOthers;
    sidePots: Pot[];
    smallBlindPlayer?: PlayerInfoForOthers;
    bigBlindPlayer?: PlayerInfoForOthers;
    commonCards: string[];
    winners?: PlayerInfoForOthers[];
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

  getPlayerPrivateInfo(userId: Ulid): PlayerPrivateInfo | undefined {
    const player = this.poker.players.find(player => player?.id === userId.get());
    return player?.privateInfo;
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
        players: this.poker.players.map(player => player && player.infoForOthers),
        actingPlayers: this.actingPlayers().map(player => player.infoForOthers),
        activePlayers: this.activePlayers().map(player => player.infoForOthers),
        currentActor: this.currentActor()?.infoForOthers,
        currentRound: this.currentRound(),
        currentBet: this.currentBet(),
        currentPot: this.currentPot(),
        dealer: this.dealer()?.infoForOthers,
        lastActor: this.lastActor()?.infoForOthers,
        sidePots: this.sidePots(),
        smallBlindPlayer: this.smallBlindPlayer()?.infoForOthers,
        bigBlindPlayer: this.bigBlindPlayer()?.infoForOthers,
        commonCards: this.commonCards().map(card => card.toString()),
        winners: this.winners()?.map(player => player.infoForOthers),
      },
    };
  }

  getPlayer(userId: Ulid): Player | undefined {
    return this.poker.players.find(player => player?.id === userId.get()) || undefined;
  }

  gameId(): Ulid | undefined {
    return this.poker.gameId ? new Ulid(this.poker.gameId) : undefined;
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

  currentActor(): Player | undefined {
    return this.poker.currentActor;
  }

  currentRound(): BettingRound | undefined {
    return this.poker.currentRound;
  }

  currentBet(): CurrentBet | undefined {
    return this.poker.currentBet ? new CurrentBet(this.poker.currentBet) : undefined;
  }

  currentPot(): Pot | undefined {
    return this.poker.currentPot;
  }

  dealer(): Player | undefined {
    return this.poker.dealer;
  }

  lastActor(): Player | undefined {
    return this.poker.lastActor;
  }

  sidePots(): Pot[] {
    return this.poker.sidePots;
  }

  smallBlindPlayer(): Player | undefined {
    return this.poker.smallBlindPlayer;
  }

  bigBlindPlayer(): Player | undefined {
    return this.poker.bigBlindPlayer;
  }

  commonCards(): Card[] {
    return this.poker.communityCards;
  }

  winners(): Player[] | undefined {
    return this.poker.winners;
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

  private generateTableLog(preRound: BettingRound | undefined): TableLog[] {
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
        TableLogFactory.createEndingHandLog(this.id, this.ensurerGameId(), {}, this.getSequenceForLog()),
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
