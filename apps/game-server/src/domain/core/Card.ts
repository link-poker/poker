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

  getCardInfo(): CardInfo {
    return {
      rank: this._rank,
      suit: this._suit,
    };
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

  extractState() {
    return {
      rank: this._rank,
      suit: this._suit,
    };
  }

  restoreState(state: any) {
    this._rank = state.rank;
    this._suit = state.suit;
  }
}

export enum CardColor {
  RED = '#ff0000',
  BLACK = '#000000',
}

export enum CardSuit {
  CLUB = 'c',
  DIAMOND = 'd',
  HEART = 'h',
  SPADE = 's',
}

export enum CardRank {
  ACE = 'A',
  KING = 'K',
  QUEEN = 'Q',
  JACK = 'J',
  TEN = 'T',
  NINE = '9',
  EIGHT = '8',
  SEVEN = '7',
  SIX = '6',
  FIVE = '5',
  FOUR = '4',
  THREE = '3',
  TWO = '2',
}
