// only primitive types are allowed in this type
export type CardState = {
  rank: string;
  suit: string;
};

export type CardInfo = {
  rank: string;
  suit: string;
};

export class Card {
  private _rank: CardRank;
  private _suit: CardSuit;

  constructor(rank: CardRank, suit: CardSuit) {
    this._rank = rank;
    this._suit = suit;
  }

  static initFromState(state: CardState) {
    return new Card(state.rank as CardRank, state.suit as CardSuit);
  }

  toState(): CardState {
    return {
      rank: this._rank,
      suit: this._suit,
    };
  }

  toString(): string {
    return this._rank + this._suit;
  }

  get rank() {
    return this._rank;
  }

  get suit() {
    return this._suit;
  }

  get color() {
    switch (this._suit) {
      case CardSuit.CLUB:
      case CardSuit.SPADE:
        return CardColor.BLACK;
      case CardSuit.DIAMOND:
      case CardSuit.HEART:
        return CardColor.RED;
    }
  }

  get suitChar() {
    switch (this._suit) {
      case CardSuit.CLUB:
        return '♣';
      case CardSuit.DIAMOND:
        return '♦';
      case CardSuit.HEART:
        return '♥';
      case CardSuit.SPADE:
        return '♠';
    }
  }
}

export type CardColor = (typeof CardColor)[keyof typeof CardColor];
export const CardColor = {
  RED: '#ff0000',
  BLACK: '#000000',
} as const;

export type CardSuit = (typeof CardSuit)[keyof typeof CardSuit];
export const CardSuit = {
  CLUB: 'C',
  DIAMOND: 'D',
  HEART: 'H',
  SPADE: 'S',
} as const;

export type CardRank = (typeof CardRank)[keyof typeof CardRank];
export const CardRank = {
  ACE: 'A',
  KING: 'K',
  QUEEN: 'Q',
  JACK: 'J',
  TEN: 'T',
  NINE: '9',
  EIGHT: '8',
  SEVEN: '7',
  SIX: '6',
  FIVE: '5',
  FOUR: '4',
  THREE: '3',
  TWO: '2',
} as const;
