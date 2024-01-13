import { Hand } from 'pokersolver';
import { BettingRound, Poker } from '../../../src/domain/core/Poker';

const POKER = {
  BUY_IN: 1000,
  SMALL_BLIND: 10,
  BIG_BLIND: 20,
};

const PLAYERS = {
  ALICE: { ID: '01HKM34S0N9DYJDYZZ1MK6KAEV', STACK: 1000, SEAT: 1 },
  BOB: { ID: '01HKM38HX0WT7P8KXWN1CKVAEE', STACK: 1000, SEAT: 2 },
  CHARLIE: { ID: '01HKM3T3XYV8KXDFAPZ7RHD3VN', STACK: 1000, SEAT: 3 },
};

describe('Poker', () => {
  it('should be able to create a new instance', () => {
    const poker = new Poker(POKER.BUY_IN, POKER.SMALL_BLIND, POKER.BIG_BLIND);
    expect(poker).toBeInstanceOf(Poker);
  });

  it('should be able to sit down and stand up', () => {
    const poker = new Poker(POKER.BUY_IN, POKER.SMALL_BLIND, POKER.BIG_BLIND);
    const player1SEAT = poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
    const player2SEAT = poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
    const player3SEAT = poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
    expect(player1SEAT).toEqual(PLAYERS.ALICE.SEAT);
    expect(player2SEAT).toEqual(PLAYERS.BOB.SEAT);
    expect(player3SEAT).toEqual(PLAYERS.CHARLIE.SEAT);
    expect(poker.players[PLAYERS.ALICE.SEAT]!.id).toEqual(PLAYERS.ALICE.ID);
    expect(poker.players[PLAYERS.BOB.SEAT]!.id).toEqual(PLAYERS.BOB.ID);
    expect(poker.players[PLAYERS.CHARLIE.SEAT]!.id).toEqual(PLAYERS.CHARLIE.ID);
    const player2 = poker.standUp(PLAYERS.BOB.ID);
    expect(player2.id).toEqual(PLAYERS.BOB.ID);
    expect(poker.players[PLAYERS.BOB.SEAT]).toBeNull();
  });

  describe('action', () => {
    let poker: Poker;
    beforeEach(() => {
      poker = new Poker(POKER.BUY_IN, POKER.SMALL_BLIND, POKER.BIG_BLIND);
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
    });

    it('should be able to deal cards', () => {
      poker.dealCards();
      expect(poker.players[PLAYERS.ALICE.SEAT]!.holeCards).toHaveLength(2);
      expect(poker.players[PLAYERS.BOB.SEAT]!.holeCards).toHaveLength(2);
      expect(poker.players[PLAYERS.CHARLIE.SEAT]!.holeCards).toHaveLength(2);
    });

    it('should be able to call and check', () => {
      poker.dealCards();
      expect(poker.winners).toBeUndefined();
      // PreFlop
      expect(poker.currentRound).toBe(BettingRound.PRE_FLOP);
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      poker.currentActor!.callAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.callAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      expect(poker.currentRound).toBe(BettingRound.PRE_FLOP);
      poker.currentActor!.checkAction();
      // Flop
      expect(poker.currentRound).toBe(BettingRound.FLOP);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      expect(poker.currentRound).toBe(BettingRound.FLOP);
      poker.currentActor!.checkAction();
      // Turn
      expect(poker.currentRound).toBe(BettingRound.TURN);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      expect(poker.currentRound).toBe(BettingRound.TURN);
      poker.currentActor!.checkAction();
      // River
      expect(poker.currentRound).toBe(BettingRound.RIVER);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      expect(poker.currentRound).toBe(BettingRound.RIVER);
      poker.currentActor!.checkAction();
      // Showdown
      expect(poker.currentRound).toBeUndefined();
      const aliceHand = poker.players[PLAYERS.ALICE.SEAT]!.hand;
      const bobHand = poker.players[PLAYERS.BOB.SEAT]!.hand;
      const charlieHand = poker.players[PLAYERS.CHARLIE.SEAT]!.hand;
      aliceHand.playerId = PLAYERS.ALICE.ID;
      bobHand.playerId = PLAYERS.BOB.ID;
      charlieHand.playerId = PLAYERS.CHARLIE.ID;
      const winnerId = Hand.winners([aliceHand, bobHand, charlieHand]).map((hand: any) => hand.playerId);
      expect(poker.winners!.map(winner => winner.id)).toEqual(winnerId);
      // NewGame
      poker.dealCards();
      expect(poker.winners).toBeUndefined();
      expect(poker.currentRound).toBe(BettingRound.PRE_FLOP);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
    });

    it('should be able to raise, bet and fold', () => {
      poker.dealCards();
      expect(poker.winners).toBeUndefined();
      // PreFlop
      expect(poker.currentRound).toBe(BettingRound.PRE_FLOP);
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      poker.currentActor!.callAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.raiseAction(POKER.BIG_BLIND * 2);
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      poker.currentActor!.callAction();
      expect(poker.currentRound).toBe(BettingRound.PRE_FLOP);
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      poker.currentActor!.callAction();
      // Flop
      expect(poker.currentRound).toBe(BettingRound.FLOP);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.betAction(POKER.BIG_BLIND * 4);
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      poker.currentActor!.callAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      expect(poker.currentRound).toBe(BettingRound.FLOP);
      poker.currentActor!.callAction();
      // Turn
      expect(poker.currentRound).toBe(BettingRound.TURN);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      poker.currentActor!.checkAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      expect(poker.currentRound).toBe(BettingRound.TURN);
      poker.currentActor!.checkAction();
      // River
      expect(poker.currentRound).toBe(BettingRound.RIVER);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      poker.currentActor!.betAction(POKER.BIG_BLIND * 8);
      expect(poker.currentActor!.id).toBe(PLAYERS.CHARLIE.ID);
      poker.currentActor!.raiseAction(POKER.BIG_BLIND * 16);
      expect(poker.currentActor!.id).toBe(PLAYERS.ALICE.ID);
      poker.currentActor!.foldAction();
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
      expect(poker.currentRound).toBe(BettingRound.RIVER);
      poker.currentActor!.callAction();
      // Showdown
      expect(poker.currentRound).toBeUndefined();
      const bobHand = poker.players[PLAYERS.BOB.SEAT]!.hand;
      const charlieHand = poker.players[PLAYERS.CHARLIE.SEAT]!.hand;
      bobHand.playerId = PLAYERS.BOB.ID;
      charlieHand.playerId = PLAYERS.CHARLIE.ID;
      const winnerId = Hand.winners([bobHand, charlieHand]).map((hand: any) => hand.playerId);
      expect(poker.winners!.map(winner => winner.id)).toEqual(winnerId);
      // NewGame
      poker.dealCards();
      expect(poker.winners).toBeUndefined();
      expect(poker.currentRound).toBe(BettingRound.PRE_FLOP);
      expect(poker.currentActor!.id).toBe(PLAYERS.BOB.ID);
    });
  });
});
