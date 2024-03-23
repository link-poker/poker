import { Hand } from 'pokersolver';
import { Card, CardState } from './Card';
import { Poker } from './Poker';

// only primitive types are allowed in this type
export type PlayerState = {
  id: string;
  name: string;
  stackSize: number;
  bet: number;
  raise: number | undefined;
  holeCards: [CardState, CardState] | undefined;
  folded: boolean;
  away: boolean;
  showCards: boolean;
  left: boolean;
};

export type PlayerPrivateInfo = {
  holeCards: string[];
  hand: string | null;
};

export type PlayerInfoForOthers = {
  id: string;
  name: string;
  stackSize: number;
  bet: number;
  raise: number | null;
  holeCards: string[];
  folded: boolean;
  showCards: boolean;
  left: boolean;
  away: boolean;
  hand: string | null;
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
    public table: Poker,
  ) {}

  static initFromState(state: PlayerState, table: Poker) {
    const player = new Player(state.id, state.name, state.stackSize, table);
    player.restoreState(state);
    return player;
  }

  get privateInfo(): PlayerPrivateInfo {
    return {
      holeCards: this.holeCards?.map(card => card.toString()) ?? [],
      hand: this.hand?.name ?? null,
    };
  }

  get infoForOthers(): PlayerInfoForOthers {
    return {
      id: this.id,
      name: this.name,
      stackSize: this.stackSize,
      bet: this.bet,
      raise: this.raise ?? null,
      holeCards: this.showCards ? this.holeCards?.map(card => card.toString()) ?? [] : [],
      folded: this.folded,
      showCards: this.showCards,
      left: this.left,
      away: this.away,
      hand: (this.showCards && this.hand?.name) ?? null,
    };
  }

  get hand() {
    if (!this.holeCards) return null;
    return Hand.solve(this.holeCards.concat(this.table.communityCards).map(card => `${card.rank}${card.suit}`));
  }

  betAction(amount: number) {
    if (this !== this.table.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('BET')) {
      throw new Error('Illegal action.');
    }
    if (isNaN(amount)) {
      throw new Error('Amount was not a valid number.');
    }
    const currentBet = this.table.currentBet;
    if (currentBet) throw new Error('Illegal action. There is already a bet on the table.');
    if (amount < this.table.bigBlind) {
      throw new Error('A bet must be at least as much as the big blind.');
    } else if (amount > this.stackSize) {
      throw new Error('You cannot bet more than you brought to the table.');
    }
    this.raiseAction(amount);
  }

  callAction() {
    if (this !== this.table.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('CALL')) {
      throw new Error('Illegal action.');
    }
    const currentBet = this.table.currentBet;
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
    this.table.nextAction();
  }

  raiseAction(amount: number) {
    if (this !== this.table.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    const legalActions = this.legalActions();
    if (!legalActions.includes('RAISE') && !legalActions.includes('BET')) {
      throw new Error('Illegal action.');
    }
    if (amount === undefined || isNaN(amount)) {
      throw new Error('Amount was not a valid number.');
    }
    if (amount > this.stackSize) {
      throw new Error('You cannot bet more than you brought to the table.');
    }
    const currentBet = this.table.currentBet;
    const lastRaise = this.table.lastRaise;
    const minRaise = lastRaise ?? this.table.bigBlind;
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
      this.table.currentBet = this.bet;
    } else if (amount >= minRaise) {
      this.stackSize -= amount;
      this.bet += amount;
      this.table.currentBet = this.bet;
      // Only mark raise values if there is a current bet.
      if (currentBet) {
        this.raise = this.table.lastRaise = amount - currentBet;
      }
      // Set last action to the player behind this one.
      this.table.lastPosition = this.table.currentPosition! - 1;
      if (this.table.lastPosition === -1) this.table.lastPosition = this.table.players.length - 1;
      while (!this.table.lastActor || !this.table.actingPlayers.includes(this.table.lastActor)) {
        this.table.lastPosition--;
        if (this.table.lastPosition === -1) this.table.lastPosition = this.table.players.length - 1;
      }
    }

    this.table.nextAction();
  }

  checkAction() {
    if (this !== this.table.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('CHECK')) {
      throw new Error('Illegal action.');
    }
    this.table.nextAction();
  }

  foldAction() {
    if (this !== this.table.currentActor) {
      throw new Error('Action invoked on player out of turn!');
    }
    if (!this.legalActions().includes('FOLD')) {
      throw new Error('Illegal action.');
    }
    this.folded = true;
    this.table.nextAction();
  }

  legalActions(): Action[] {
    const currentBet = this.table.currentBet;
    const lastRaise = this.table.lastRaise;
    const actions: Action[] = [];
    if (!currentBet) {
      actions.push('CHECK', 'BET');
    } else {
      if (this.bet === currentBet) {
        actions.push('CHECK');
        if (this.stackSize > currentBet && this.table.actingPlayers.length > 0) {
          actions.push('RAISE');
        }
      }
      if (this.bet < currentBet) {
        actions.push('CALL');
        if (
          this.stackSize > currentBet &&
          this.table.actingPlayers.length > 0 &&
          (!lastRaise || !this.raise || lastRaise >= this.raise)
        ) {
          actions.push('RAISE');
        }
      }
    }
    actions.push('FOLD');
    return actions;
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

  restoreState(state: PlayerState): Player {
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
    return this;
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
