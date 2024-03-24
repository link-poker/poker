import { Hand } from 'pokersolver';
import { Card, CardState } from './Card';
import { Poker } from './Poker';

// only primitive types are allowed in this type
export type PlayerState = {
  id: string;
  name: string;
  stackSize: number;
  bet: number;
  raise?: number;
  holeCards?: [CardState, CardState];
  folded: boolean;
  away: boolean;
  showCards: boolean;
  left: boolean;
};

export type PlayerPrivateInfo = {
  holeCards: string[];
  hand?: string;
};

export type PlayerInfoForOthers = {
  id: string;
  name: string;
  stackSize: number;
  bet: number;
  raise?: number;
  holeCards: string[];
  folded: boolean;
  showCards: boolean;
  left: boolean;
  away: boolean;
  hand: string;
};

export class Player {
  bet: number = 0;
  raise?: number;
  holeCards?: [Card, Card];
  folded: boolean = false;
  showCards: boolean = false;
  left: boolean = false;
  away: boolean = false;

  constructor(
    public id: string,
    public name: string,
    public stackSize: number,
    public poker: Poker,
  ) {}

  static initFromState(state: PlayerState, poker: Poker) {
    const player = new Player(state.id, state.name, state.stackSize, poker);
    player.restoreState(state);
    return player;
  }

  toState(): PlayerState {
    return {
      id: this.id,
      name: this.name,
      stackSize: this.stackSize,
      bet: this.bet,
      raise: this.raise,
      holeCards: this.holeCards ? [this.holeCards[0].toState(), this.holeCards[1].toState()] : undefined,
      folded: this.folded,
      showCards: this.showCards,
      left: this.left,
      away: this.away,
    };
  }

  get privateInfo(): PlayerPrivateInfo {
    return {
      holeCards: this.holeCards?.map(card => card.toString()) ?? [],
      hand: this.hand?.name,
    };
  }

  get infoForOthers(): PlayerInfoForOthers {
    return {
      id: this.id,
      name: this.name,
      stackSize: this.stackSize,
      bet: this.bet,
      raise: this.raise,
      holeCards: this.showCards ? this.holeCards?.map(card => card.toString()) ?? [] : [],
      folded: this.folded,
      showCards: this.showCards,
      left: this.left,
      away: this.away,
      hand: this.showCards ? this.hand?.name : undefined,
    };
  }

  get hand(): typeof Hand | undefined {
    if (!this.holeCards) return undefined;
    return Hand.solve(this.holeCards.concat(this.poker.communityCards).map(card => `${card.rank}${card.suit}`));
  }

  betAction(amount: number) {
    if (this !== this.poker.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('BET')) {
      throw new Error('Illegal action.');
    }
    if (isNaN(amount)) {
      throw new Error('Amount was not a valid number.');
    }
    const currentBet = this.poker.currentBet;
    if (currentBet) throw new Error('Illegal action. There is already a bet on the poker.');
    if (amount < this.poker.bigBlind) {
      throw new Error('A bet must be at least as much as the big blind.');
    } else if (amount > this.stackSize) {
      throw new Error('You cannot bet more than you brought to the poker.');
    }
    this.raiseAction(amount);
  }

  callAction() {
    if (this !== this.poker.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('CALL')) {
      throw new Error('Illegal action.');
    }
    const currentBet = this.poker.currentBet;
    if (!currentBet) throw new Error('Illegal action. There is no bet to call.');
    const callAmount = currentBet - this.bet;
    // All-in via inability to call
    if (callAmount > this.stackSize) {
      // Add stack to current bet and empty stack;
      this.bet += this.stackSize;
      this.stackSize = 0;
    } else {
      delete this.raise;
      this.stackSize -= callAmount;
      this.bet += callAmount;
    }
    this.poker.nextAction();
  }

  raiseAction(amount: number) {
    if (this !== this.poker.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    const legalActions = this.legalActions();
    if (!legalActions.includes('RAISE') && !legalActions.includes('BET')) {
      throw new Error('Illegal action.');
    }
    if (!amount || isNaN(amount)) {
      throw new Error('Amount was not a valid number.');
    }
    if (amount > this.stackSize) {
      throw new Error('You cannot bet more than you brought to the poker.');
    }
    const currentBet = this.poker.currentBet;
    const lastRaise = this.poker.lastRaise;
    const minRaise = lastRaise ?? this.poker.bigBlind;
    const raiseAmount = currentBet ? amount - currentBet : amount;
    // Do not allow the raise if it's less than the minimum and they aren't going all-in.
    if (raiseAmount < minRaise && amount < this.stackSize) {
      if (currentBet) {
        throw new Error(`You must raise by at least \`$${minRaise}\`, making the bet \`$${minRaise + currentBet}\`.`);
      } else {
        throw new Error(`You must bet at least \`$${minRaise}\`.`);
      }
    } else if (raiseAmount < minRaise && amount >= this.stackSize) {
      // When the all-in player is raising for less than the minimum raise then increase the bet amount but do not change last raise value.
      this.bet += this.stackSize;
      this.stackSize = 0;
      this.poker.currentBet = this.bet;
    } else if (amount >= minRaise) {
      this.stackSize -= amount;
      this.bet += amount;
      this.poker.currentBet = this.bet;
      // Only mark raise values if there is a current bet.
      if (currentBet) {
        this.raise = this.poker.lastRaise = amount - currentBet;
      }
      // Set last action to the player behind this one.
      this.poker.lastPosition = this.poker.currentPosition! - 1;
      if (this.poker.lastPosition === -1) this.poker.lastPosition = this.poker.players.length - 1;
      while (!this.poker.lastActor || !this.poker.actingPlayers.includes(this.poker.lastActor)) {
        this.poker.lastPosition--;
        if (this.poker.lastPosition === -1) this.poker.lastPosition = this.poker.players.length - 1;
      }
    }

    this.poker.nextAction();
  }

  checkAction() {
    if (this !== this.poker.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('CHECK')) {
      throw new Error('Illegal action.');
    }
    this.poker.nextAction();
  }

  foldAction() {
    if (this !== this.poker.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('FOLD')) {
      throw new Error('Illegal action.');
    }
    this.folded = true;
    this.poker.nextAction();
  }

  legalActions(): Action[] {
    const currentBet = this.poker.currentBet;
    const lastRaise = this.poker.lastRaise;
    const actions: Action[] = [];
    if (!currentBet) {
      actions.push('CHECK', 'BET');
    } else {
      if (this.bet === currentBet) {
        actions.push('CHECK');
        if (this.stackSize > currentBet && this.poker.actingPlayers.length > 0) {
          actions.push('RAISE');
        }
      }
      if (this.bet < currentBet) {
        actions.push('CALL');
        if (
          this.stackSize > currentBet &&
          this.poker.actingPlayers.length > 0 &&
          (!lastRaise || !this.raise || lastRaise >= this.raise)
        ) {
          actions.push('RAISE');
        }
      }
    }
    actions.push('FOLD');
    return actions;
  }

  private restoreState(state: PlayerState) {
    const { id, name, stackSize, bet, raise, holeCards, folded, showCards, left, away } = state;
    this.id = id;
    this.name = name;
    this.stackSize = stackSize;
    this.bet = bet;
    this.raise = raise;
    this.holeCards = holeCards ? [Card.initFromState(holeCards[0]), Card.initFromState(holeCards[1])] : undefined;
    this.folded = folded;
    this.showCards = showCards;
    this.left = left;
    this.away = away;
  }
}
type Action = (typeof Action)[keyof typeof Action];
const Action = {
  BET: 'BET',
  CALL: 'CALL',
  CHECK: 'CHECK',
  FOLD: 'FOLD',
  RAISE: 'RAISE',
} as const;
