import { ValidationError } from '../../error';
import { Card } from '../core/Card';
import { Player, PlayerInfoForOthers, PlayerPrivateInfo } from '../core/Player';
import { Poker, Pot } from '../core/Poker';
import { PokerLogFactory } from '../factories/PokerLogFactory';
import { AddOnAmount } from '../value-objects/AddOnAmount';
import { BetAmount } from '../value-objects/BetAmount';
import { BettingRound, BettingRoundEnum } from '../value-objects/BettingRound';
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
import { PokerLog } from './PokerLog';
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
      this.status = new TableStatus(TableStatusEnum.WAITING);
    }
  }

  // cleanUp(): void {
  //   this.poker.cleanUp();
  // }

  dealCards(): PokerLog[] {
    const preRound = this.currentRound();
    this.status = new TableStatus(TableStatusEnum.PLAYING);
    const gameId = Ulid.create();
    this.poker.dealCards(gameId.get());
    const startingHandLog = PokerLogFactory.createStartingHandLog(this.id, this.gameId()!, {
      dealerName: this.dealer.name,
    });
    const stackLog = PokerLogFactory.createStackLog(
      this.id,
      this.gameId()!,
      this.activePlayers().map(player => {
        return { playerName: player.name, stack: player.stackSize };
      }),
    );
    const smallBlindLog = PokerLogFactory.createSmallBlindLog(this.id, this.gameId()!, {
      playerName: this.smallBlindPlayer()!.name,
      amount: this.smallBlind().get(),
    });
    const bigBlindLog = PokerLogFactory.createBigBlindLog(this.id, this.gameId()!, {
      playerName: this.bigBlindPlayer()!.name,
      amount: this.bigBlind().get(),
    });
    return [startingHandLog, stackLog, smallBlindLog, bigBlindLog, ...this.generatePokerLog(preRound)];
  }

  // nextAction(): void {
  //   this.poker.nextAction();
  // }

  // gatherBets(): void {
  //   this.poker.gatherBets();
  // }

  // nextRound(): void {
  //   this.poker.nextRound();
  // }

  // showdown(): void {
  //   this.poker.showdown();
  // }

  // newDeck(): Card[] {
  //   return this.poker.newDeck();
  // }

  addOn(userId: Ulid, amount: AddOnAmount): void {
    this.poker.addOn(userId.get(), amount.get());
  }

  call(userId: Ulid): PokerLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.callAction();
    const callLog = PokerLogFactory.createCallLog(this.id, this.gameId()!, {
      playerName: this.getPlayer(userId)!.name,
    });
    return [callLog, ...this.generatePokerLog(preRound)];
  }

  check(userId: Ulid): PokerLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.checkAction();
    const checkLog = PokerLogFactory.createCheckLog(this.id, this.gameId()!, {
      playerName: this.getPlayer(userId)!.name,
    });
    return [checkLog, ...this.generatePokerLog(preRound)];
  }

  fold(userId: Ulid): PokerLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.foldAction();
    const foldLog = PokerLogFactory.createFoldLog(this.id, this.gameId()!, {
      playerName: this.getPlayer(userId)!.name,
    });
    return [foldLog, ...this.generatePokerLog(preRound)];
  }

  bet(userId: Ulid, amount: BetAmount): PokerLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.betAction(amount.get());
    const betLog = PokerLogFactory.createBetLog(this.id, this.gameId()!, {
      playerName: this.poker.currentActor!.name,
      amount: amount.get(),
    });
    return [betLog, ...this.generatePokerLog(preRound)];
  }

  raise(userId: Ulid, amount: RaiseAmount): PokerLog[] {
    const preRound = this.currentRound();
    this.ensureYourTurn(userId);
    this.poker.currentActor!.raiseAction(amount.get());
    const raiseLog = PokerLogFactory.createRaiseLog(this.id, this.gameId()!, {
      playerName: this.poker.currentActor!.name,
      amount: amount.get(),
    });
    return [raiseLog, ...this.generatePokerLog(preRound)];
  }

  private ensureYourTurn(userId: Ulid): void {
    if (!this.poker.currentActor) throw new ValidationError('No current actor');
    if (this.poker.currentActor?.id !== userId.get()) {
      throw new ValidationError(
        `It's not your turn. Current actor: ${this.poker.currentActor?.name} id: ${this.poker.currentActor?.id}`,
      );
    }
  }

  private generatePokerLog(preRound: BettingRound | null): PokerLog[] {
    const round = this.currentRound();
    if (preRound === round) return [];
    if (!round) {
      return [
        ...this.actingPlayers().map(player => {
          return PokerLogFactory.createShowDownLog(this.id, this.gameId()!, {
            playerName: player.name,
            hand: player.hand,
          });
        }),
        PokerLogFactory.createCollectPotLog(
          this.id,
          this.gameId()!,
          this.winners()!.map(player => {
            return { playerName: player.name, amount: player.stackSize };
          }),
        ),
        PokerLogFactory.createEndingHandLog(this.id, this.gameId()!, null),
      ];
    }
    switch (round.get()) {
      case BettingRoundEnum.FLOP:
        return [
          PokerLogFactory.createFlopLog(this.id, this.gameId()!, {
            card1: this.commonCards()[0].toString(),
            card2: this.commonCards()[1].toString(),
            card3: this.commonCards()[2].toString(),
          }),
        ];
      case BettingRoundEnum.TURN:
        return [
          PokerLogFactory.createTurnLog(this.id, this.gameId()!, {
            card1: this.commonCards()[0].toString(),
            card2: this.commonCards()[1].toString(),
            card3: this.commonCards()[2].toString(),
            card4: this.commonCards()[3].toString(),
          }),
        ];
      case BettingRoundEnum.RIVER:
        return [
          PokerLogFactory.createRiverLog(this.id, this.gameId()!, {
            card1: this.commonCards()[0].toString(),
            card2: this.commonCards()[1].toString(),
            card3: this.commonCards()[2].toString(),
            card4: this.commonCards()[3].toString(),
            card5: this.commonCards()[4].toString(),
          }),
        ];
      default:
        return [];
    }
  }
}
