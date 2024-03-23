import { Hand } from 'pokersolver';
import { BettingRound } from '../value-objects/BettingRound';
import { Card, CardSuit, CardRank, CardState } from './Card';
import { Player, PlayerState } from './Player';
import { Pot, PotState } from './Pot';

// only primitive types are allowed in this type
export type PokerState = {
  buyIn: number;
  autoMoveDealer: boolean;
  bigBlind: number;
  bigBlindPosition?: number;
  communityCards: CardState[];
  currentBet?: number;
  currentPosition?: number;
  currentRound?: string;
  dealerPosition?: number;
  debug: boolean;
  deck: CardState[];
  handNumber: number;
  lastPosition?: number;
  lastRaise?: number;
  players: (PlayerState | null)[];
  pots: {
    amount: number;
    eligiblePlayers: PlayerState[];
    winners?: PlayerState[];
  }[];
  smallBlind: number;
  smallBlindPosition?: number;
  winners?: PlayerState[];
  gameId?: string;
};

export class Poker {
  public autoMoveDealer: boolean = true;
  public bigBlindPosition?: number;
  public communityCards: Card[] = [];
  public currentBet?: number;
  public currentPosition?: number;
  public currentRound?: BettingRound;
  public dealerPosition?: number;
  public debug: boolean = false;
  public deck: Card[] = [];
  public handNumber: number = 0;
  public lastPosition?: number;
  public lastRaise?: number;
  public players: (Player | null)[] = [null, null, null, null, null, null, null, null, null, null];
  public pots: Pot[] = [];
  public smallBlindPosition?: number;
  public winners?: Player[];
  public gameId?: string;

  constructor(
    public buyIn: number = 1000,
    public smallBlind: number = 5,
    public bigBlind: number = 10,
  ) {
    if (smallBlind >= bigBlind) {
      throw new Error('The small blind must be less than the big blind.');
    }
  }

  static initFromState(state: PokerState): Poker {
    const poker = new Poker(state.buyIn, state.smallBlind, state.bigBlind);
    poker.restoreState(state);
    return poker;
  }

  get actingPlayers(): Player[] {
    return this.players.filter(
      player =>
        player &&
        !player.folded &&
        !player.away &&
        player.stackSize > 0 &&
        (!this.currentBet || !player.raise || (this.currentBet && player.bet < this.currentBet)),
    ) as Player[];
  }

  get activePlayers(): Player[] {
    return this.players.filter(player => player && !player.folded && !player.away) as Player[];
  }

  get bigBlindPlayer(): Player | null {
    if (this.bigBlindPosition === undefined) return null;
    return this.players[this.bigBlindPosition];
  }

  get currentActor(): Player | null {
    if (this.currentPosition === undefined) return null;
    return this.players[this.currentPosition];
  }

  get currentPot(): Pot {
    // If there is no pot, create one.
    if (this.pots.length === 0) {
      const newPot = new Pot();
      this.pots.push(newPot);
      return newPot;
    }
    return this.pots[this.pots.length - 1];
  }

  get dealer(): Player | null {
    if (this.dealerPosition === undefined) return null;
    return this.players[this.dealerPosition];
  }

  get lastActor(): Player | null {
    if (this.lastPosition === undefined) return null;
    return this.players[this.lastPosition];
  }

  get sidePots(): Pot[] {
    if (this.pots.length <= 1) {
      return [];
    }
    return this.pots.slice(0, this.pots.length - 1);
  }

  get smallBlindPlayer(): Player | null {
    if (this.smallBlindPosition === undefined) return null;
    return this.players[this.smallBlindPosition];
  }

  moveDealer(seatNumber: number) {
    if (this.players.filter(player => player !== null).length === 0) {
      throw new Error('Move dealer was called but there are no seated players.');
    }
    this.dealerPosition = seatNumber;
    if (this.dealerPosition! >= this.players.length) {
      this.dealerPosition! -= this.players.length * Math.floor(this.dealerPosition! / this.players.length);
    }
    while (this.dealer === null && this.players.length > 0) {
      this.dealerPosition!++;
      if (this.dealerPosition! >= this.players.length) {
        this.dealerPosition! -= this.players.length * Math.floor(this.dealerPosition! / this.players.length);
      }
    }
    this.smallBlindPosition = this.dealerPosition! + 1;
    if (this.smallBlindPosition >= this.players.length) {
      this.smallBlindPosition -= this.players.length * Math.floor(this.smallBlindPosition / this.players.length);
    }
    while ((this.smallBlindPlayer === null || this.smallBlindPlayer.away) && this.players.length > 0) {
      this.smallBlindPosition!++;
      if (this.smallBlindPosition! >= this.players.length) {
        this.smallBlindPosition! -= this.players.length * Math.floor(this.smallBlindPosition! / this.players.length);
      }
    }
    this.bigBlindPosition = this.smallBlindPosition! + 1;
    if (this.bigBlindPosition >= this.players.length) {
      this.bigBlindPosition -= this.players.length * Math.floor(this.bigBlindPosition / this.players.length);
    }
    while ((this.bigBlindPlayer === null || this.bigBlindPlayer.away) && this.players.length > 0) {
      this.bigBlindPosition!++;
      if (this.bigBlindPosition! >= this.players.length) {
        this.bigBlindPosition! -= this.players.length * Math.floor(this.bigBlindPosition! / this.players.length);
      }
    }
  }

  sitDown(id: string, name: string, buyIn: number, seatNumber?: number): number {
    // If there are no null seats then the table is full.
    if (this.players.filter(player => player === null).length === 0) {
      throw new Error('The table is currently full.');
    }
    if (buyIn < this.buyIn) {
      throw new Error(`Your buy-in must be greater or equal to the minimum buy-in of ${this.buyIn}.`);
    }
    const existingPlayers = this.players.filter(player => player && player.id === id);
    if (existingPlayers.length > 0 && !this.debug) {
      throw new Error('Player already joined this table.');
    }
    if (seatNumber && this.players[seatNumber] !== null) {
      throw new Error('There is already a player in the requested seat.');
    }
    const newPlayer = new Player(id, name, buyIn, this);
    if (!seatNumber) {
      seatNumber = 0;
      while (this.players[seatNumber] !== null) {
        seatNumber++;
        if (seatNumber >= this.players.length) {
          throw new Error('No available seats!');
        }
      }
    }
    this.players[seatNumber] = newPlayer;
    if (this.currentRound) {
      newPlayer.folded = true;
    } else {
      this.cleanUp();
      this.moveDealer(this.dealerPosition ?? seatNumber);
    }
    return seatNumber;
  }

  standUp(player: Player | string): Player {
    let playersToStandUp: Player[];
    if (typeof player === 'string') {
      playersToStandUp = this.players.filter(p => p && p.id === player) as Player[];
      if (playersToStandUp.length === 0) throw new Error(`No player found.`);
    } else {
      playersToStandUp = this.players.filter(p => p === player) as Player[];
    }
    if (playersToStandUp.length !== 1) throw new Error('Something went wrong.');
    const playerToStandUp = playersToStandUp[0];
    if (this.currentRound) {
      playerToStandUp.folded = true;
      playerToStandUp.left = true;
      if (this.currentActor === playerToStandUp || this.actingPlayers.length <= 1) {
        this.nextAction();
      }
    } else {
      const playerIndex = this.players.indexOf(playerToStandUp);
      this.players[playerIndex] = null;
      if (playerIndex === this.dealerPosition) {
        if (this.players.filter(player => !!player).length === 0) {
          delete this.dealerPosition;
          delete this.smallBlindPosition;
          delete this.bigBlindPosition;
        } else {
          this.moveDealer(this.dealerPosition + 1);
        }
      }
    }
    return playerToStandUp;
  }

  away(player: Player | string): void {
    let playersToAway: Player[];
    if (typeof player === 'string') {
      playersToAway = this.players.filter(p => p && p.id === player && !p.left) as Player[];
      if (playersToAway.length === 0) throw new Error(`No player found.`);
    } else {
      playersToAway = this.players.filter(p => p === player && !p.left) as Player[];
    }
    if (playersToAway.length !== 1) throw new Error('Something went wrong.');
    const playerToAway = playersToAway[0];
    playerToAway.folded = true;
    playerToAway.away = true;
    if (this.currentRound && this.currentActor === playerToAway) {
      this.nextAction();
    }
  }

  back(player: Player | string): void {
    let playersToBack: Player[];
    if (typeof player === 'string') {
      playersToBack = this.players.filter(p => p && p.id === player && !p.left) as Player[];
      if (playersToBack.length === 0) throw new Error(`No player found.`);
    } else {
      playersToBack = this.players.filter(p => p === player && !p.left) as Player[];
    }
    if (playersToBack.length !== 1) throw new Error('Something went wrong.');
    const playerToBack = playersToBack[0];
    playerToBack.away = false;
  }

  cleanUp(): void {
    // Remove players who left;
    const leavingPlayers = this.players.filter(player => player && player.left);
    leavingPlayers.forEach(player => player && this.standUp(player));

    // Remove busted players;
    const bustedPlayers = this.players.filter(player => player && player.stackSize === 0);
    bustedPlayers.forEach(player => player && this.standUp(player));

    // Reset player bets, hole cards, and fold status.
    this.players.forEach(player => {
      if (!player) return;
      player.bet = 0;
      delete player.raise;
      delete player.holeCards;
      player.folded = false;
      player.showCards = false;
    });

    // Clear winner if there is one.
    if (this.winners) delete this.winners;

    // Reset community cards.
    this.communityCards = [];

    // Empty pots.
    this.pots = [new Pot()];

    // Remove last raise and current bet.
    delete this.lastRaise;
    delete this.currentBet;
  }

  addOn(id: string, amount: number): void {
    if (this.currentRound) {
      throw new Error('Cannot add-on during a hand.');
    }

    const player = this.players.find(player => player && player.id === id);
    if (!player) {
      throw new Error('Player not found.');
    }

    player.stackSize += amount;
  }

  dealCards(gameId: string): void {
    // Check for active round and throw if there is one.
    if (this.currentRound) {
      throw new Error('There is already an active hand!');
    }

    this.cleanUp();

    // Ensure there are at least two players.
    if (this.activePlayers.length < 2) {
      throw new Error('Not enough players to start.');
    }

    // Set round to pre-flop.
    this.currentRound = new BettingRound('PRE_FLOP');

    // Increase hand number.
    this.handNumber++;

    // Move dealer and blind positions if it's not the first hand.
    if (this.handNumber > 1 && this.autoMoveDealer) {
      this.moveDealer(this.dealerPosition! + 1);
    }

    // Force small and big blind bets and set current bet amount.
    const sbPlayer = this.players[this.smallBlindPosition!]!;
    const bbPlayer = this.players[this.bigBlindPosition!]!;
    if (this.smallBlind > sbPlayer.stackSize) {
      sbPlayer.bet = sbPlayer.stackSize;
      sbPlayer.stackSize = 0;
    } else {
      sbPlayer.stackSize -= sbPlayer.bet = this.smallBlind;
    }
    if (this.bigBlind > bbPlayer.stackSize) {
      bbPlayer.bet = bbPlayer.stackSize;
      bbPlayer.stackSize = 0;
    } else {
      bbPlayer.stackSize -= bbPlayer.bet = this.bigBlind;
    }
    this.currentBet = this.bigBlind;

    // Set current and last actors.
    this.currentPosition = this.bigBlindPosition! + 1;
    if (this.currentPosition >= this.players.length) {
      this.currentPosition -= this.players.length * Math.floor(this.currentPosition / this.players.length);
    }
    while ((this.currentActor === null || this.currentActor.away) && this.players.length > 0) {
      this.currentPosition!++;
      if (this.currentPosition! >= this.players.length) {
        this.currentPosition! -= this.players.length * Math.floor(this.currentPosition! / this.players.length);
      }
    }
    this.lastPosition = this.bigBlindPosition!;

    // Generate newly shuffled deck.
    this.deck = this.newDeck();

    // Deal cards to players.
    this.players.forEach(player => {
      if (!player || player.away) return;
      player.holeCards = [this.deck.pop()!, this.deck.pop()!];
    });

    // set gameId
    this.gameId = gameId;
  }

  nextAction(): void {
    // See if everyone has folded.
    if (this.activePlayers.length === 1) {
      this.showdown();
      return;
    }

    // If current position is last position, move to next round.
    if (this.currentPosition === this.lastPosition) {
      this.nextRound();
      return;
    }

    // Send the action to the next player.
    this.currentPosition!++;
    if (this.currentPosition! >= this.players.length) {
      this.currentPosition! -= this.players.length * Math.floor(this.currentPosition! / this.players.length);
    }

    // if the current actor is null, not an acting player, or if the player has folded or is all-in then move the action again.
    if (
      !this.currentActor ||
      !this.actingPlayers.includes(this.currentActor) ||
      (!this.currentBet && this.actingPlayers.length === 1)
    ) {
      this.nextAction();
    }
  }

  gatherBets(): void {
    // Obtain all players who placed bets.
    const bettingPlayers = this.players.filter(player => player && player.bet > 0);

    if (bettingPlayers.length <= 1) {
      bettingPlayers.forEach(player => {
        if (!player) return;
        if (player.bet) {
          player.stackSize += player.bet;
          player.bet = 0;
        }
      });
      return;
    }

    // Check for all-in players.
    let allInPlayers = bettingPlayers.filter(player => player && player.bet && player.stackSize === 0);

    // Iterate over them and gather bets until there are no more all in players.
    while (allInPlayers.length > 0) {
      // Find lowest all-in player.
      const lowestAllInBet = allInPlayers
        .filter(player => player !== null)
        .map(player => player!.bet)
        .reduce((prevBet, evalBet) => (evalBet < prevBet ? evalBet : prevBet));
      // If other players have bet more than the lowest all-in player then subtract the lowest all-in amount from their bet and add it to the pot.
      bettingPlayers.forEach(player => {
        if (!player || player.bet === 0) return;
        if (player.bet >= lowestAllInBet) {
          player.bet -= lowestAllInBet;
          this.currentPot.amount += lowestAllInBet;
          if (!this.currentPot.eligiblePlayers.includes(player)) {
            this.currentPot.eligiblePlayers.push(player);
          }
          return;
        }
        // Gather bets from folded players and players who only called the lowest all-in.
        this.currentPot.amount += player.bet;
        player.bet = 0;
        if (!this.currentPot.eligiblePlayers.includes(player)) {
          this.currentPot.eligiblePlayers.push(player);
        }
      });
      // Check for all-in players again.
      allInPlayers = allInPlayers.filter(player => player && player.bet && player.stackSize === 0);
      // Create new pot.
      this.pots.push(new Pot());
    }

    // Once we're done with all-in players add the remaining bets to the pot.
    bettingPlayers.forEach(player => {
      if (!player || player.bet === 0) return;
      this.currentPot.amount += player.bet;
      player.bet = 0;
      if (!this.currentPot.eligiblePlayers.includes(player)) {
        this.currentPot.eligiblePlayers.push(player);
      }
    });

    // Remove any folded players from pot eligibility.
    this.pots.forEach(
      pot => (pot.eligiblePlayers = pot.eligiblePlayers.filter(player => !player.folded && !player.left)),
    );
  }

  nextRound(): void {
    const resetPosition = () => {
      // Set action to first player after dealer.
      this.currentPosition = this.dealerPosition! + 1;
      if (this.currentPosition === this.players.length) {
        this.currentPosition = 0;
      }
      while (this.currentActor === null && this.players.length > 0) {
        this.currentPosition++;
        if (this.currentPosition >= this.players.length) {
          this.currentPosition = 0;
        }
      }
      this.lastPosition = this.dealerPosition!;
      if (!this.actingPlayers.includes(this.currentActor!) || this.actingPlayers.length <= 1) {
        this.nextAction();
      }
    };

    switch (this.currentRound?.get()) {
      case 'PRE_FLOP':
        // Gather bets and place them in the pot.
        this.gatherBets();

        // Reset current bet and last raise.
        delete this.currentBet;
        delete this.lastRaise;

        // Set round to flop.
        this.currentRound = new BettingRound('FLOP');

        // Deal the flop.
        this.communityCards.push(this.deck.pop()!, this.deck.pop()!, this.deck.pop()!);

        // Reset position;
        resetPosition();

        break;
      case 'FLOP':
        // Gather bets and place them in the pot.
        this.gatherBets();

        // Reset current bet and last raise.
        delete this.currentBet;
        delete this.lastRaise;

        // Set round to turn.
        this.currentRound = new BettingRound('TURN');

        // Deal the turn.
        this.communityCards.push(this.deck.pop()!);

        // Reset position;
        resetPosition();

        break;
      case 'TURN':
        // Gather bets and place them in the pot.
        this.gatherBets();

        // Reset current bet and last raise.
        delete this.currentBet;
        delete this.lastRaise;

        // Set round to river.
        this.currentRound = new BettingRound('RIVER');

        // Deal the turn.
        this.communityCards.push(this.deck.pop()!);

        // Reset position.
        resetPosition();

        break;
      case 'RIVER':
        this.players.forEach(player => {
          if (!player) return;
          player.showCards = !player.folded;
        });
        this.showdown();
        break;
    }
  }

  showdown() {
    delete this.currentRound;
    delete this.currentPosition;
    delete this.lastPosition;

    this.gatherBets();

    // Figure out all winners for display.

    const findWinners = (players: Player[]) =>
      Hand.winners(
        players.map(player => {
          const hand = player.hand;
          hand.player = player;
          return hand;
        }),
      ).map((hand: any) => hand.player);

    if (this.activePlayers.length > 1) {
      this.activePlayers.forEach(player => {
        if (!player) return;
        player.showCards = true;
      });
    }

    this.winners = findWinners(this.activePlayers as Player[]);

    // Distribute pots and mark winners.
    this.pots.forEach(pot => {
      pot.winners = findWinners(pot.eligiblePlayers);
      const award = pot.amount / pot.winners!.length;
      pot.winners!.forEach(player => (player.stackSize += award));
    });
  }

  newDeck(): Card[] {
    const newDeck: Card[] = [];
    Object.values(CardSuit).forEach(suit => {
      Object.values(CardRank).forEach(rank => {
        newDeck.push(new Card(rank, suit));
      });
    });
    for (let index = newDeck.length - 1; index > 0; index--) {
      const rndIndex = Math.floor(Math.random() * (index + 1));
      [newDeck[index], newDeck[rndIndex]] = [newDeck[rndIndex], newDeck[index]];
    }
    return newDeck;
  }

  toState(): PokerState {
    return {
      buyIn: this.buyIn,
      autoMoveDealer: this.autoMoveDealer,
      bigBlind: this.bigBlind,
      bigBlindPosition: this.bigBlindPosition,
      communityCards: this.communityCards.map(card => card.toState()),
      currentBet: this.currentBet,
      currentPosition: this.currentPosition,
      currentRound: this.currentRound?.get(),
      dealerPosition: this.dealerPosition,
      debug: this.debug,
      deck: this.deck.map(card => card.toState()),
      handNumber: this.handNumber,
      lastPosition: this.lastPosition,
      lastRaise: this.lastRaise,
      players: this.players.map(player => (player ? player.toState() : null)),
      pots: this.pots.map(pot => pot.toState()),
      smallBlind: this.smallBlind,
      smallBlindPosition: this.smallBlindPosition,
      winners: this.winners?.map(player => player.toState()),
      gameId: this.gameId,
    };
  }

  restoreState(state: PokerState) {
    const {
      buyIn,
      autoMoveDealer,
      bigBlind,
      bigBlindPosition,
      communityCards,
      currentBet,
      currentPosition,
      currentRound,
      dealerPosition,
      debug,
      deck,
      handNumber,
      lastPosition,
      lastRaise,
      players,
      pots,
      smallBlind,
      smallBlindPosition,
      winners,
      gameId,
    } = state;
    this.buyIn = buyIn;
    this.autoMoveDealer = autoMoveDealer;
    this.bigBlind = bigBlind;
    this.bigBlindPosition = bigBlindPosition;
    this.communityCards = communityCards.map((cardState: CardState) => Card.initFromState(cardState));
    this.currentBet = currentBet;
    this.currentPosition = currentPosition;
    this.currentRound = currentRound ? new BettingRound(currentRound) : undefined;
    this.dealerPosition = dealerPosition;
    this.debug = debug;
    this.deck = deck.map((card: CardState) => Card.initFromState(card));
    this.handNumber = handNumber;
    this.lastPosition = lastPosition;
    this.lastRaise = lastRaise;
    this.players = players.map(
      (playerState: PlayerState | null) => playerState && Player.initFromState(playerState, this),
    );
    this.pots = pots.map((potState: PotState) => {
      return Pot.initFromState(potState, this);
    });
    this.smallBlind = smallBlind;
    this.smallBlindPosition = smallBlindPosition;
    this.winners = winners?.map((playerState: PlayerState) => {
      const player = this.players.find((p: Player | null) => p?.id === playerState.id);
      return player || Player.initFromState(playerState, this);
    });
    this.gameId = gameId;
  }
}
