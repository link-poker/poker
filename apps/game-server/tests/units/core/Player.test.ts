import { Player } from '../../../src/domain/core/Player';
import { Poker } from '../../../src/domain/core/Poker';
import { BettingRound } from '../../../src/domain/value-objects/BettingRound';
import { Ulid } from '../../../src/domain/value-objects/Ulid';

const POKER = {
  BUY_IN: 1000,
  SMALL_BLIND: 10,
  BIG_BLIND: 20,
};

const PLAYERS = {
  ALICE: { ID: '01HKM34S0N9DYJDYZZ1MK6KAEV', NAME: 'alice', STACK: 1000, SEAT: 1 },
  BOB: { ID: '01HKM38HX0WT7P8KXWN1CKVAEE', NAME: 'bob', STACK: 1000, SEAT: 2 },
  CHARLIE: { ID: '01HKM3T3XYV8KXDFAPZ7RHD3VN', NAME: 'charlie', STACK: 1000, SEAT: 3 },
};

describe('Player', () => {
  let poker: Poker;
  beforeEach(() => {
    poker = new Poker(POKER.BUY_IN, POKER.SMALL_BLIND, POKER.BIG_BLIND);
  });

  it('should be able to create a new instance', () => {
    const player = new Player(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, poker);
    expect(player).toBeInstanceOf(Player);
  });

  describe('initFromState', () => {
    it('should be able to init from state', () => {
      const player = new Player(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, poker);
      const initializedPlayer = Player.initFromState(
        {
          id: player.id,
          name: player.name,
          stackSize: player.stackSize,
          bet: player.bet,
          raise: player.raise,
          holeCards: player.holeCards,
          folded: player.folded,
          away: player.away,
          showCards: player.showCards,
          left: player.left,
        },
        poker,
      );
      expect(initializedPlayer.id).toEqual(player.id);
      expect(initializedPlayer.name).toEqual(player.name);
      expect(initializedPlayer.stackSize).toEqual(player.stackSize);
      expect(initializedPlayer.bet).toEqual(player.bet);
      expect(initializedPlayer.holeCards).toEqual(player.holeCards);
      expect(initializedPlayer.folded).toEqual(player.folded);
      expect(initializedPlayer.away).toEqual(player.away);
      expect(initializedPlayer.showCards).toEqual(player.showCards);
      expect(initializedPlayer.left).toEqual(player.left);
    });
  });

  describe('toState', () => {
    it('should be able to convert to state', () => {
      const player = new Player(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, poker);
      const state = player.toState();
      expect(state.id).toEqual(player.id);
      expect(state.name).toEqual(player.name);
      expect(state.stackSize).toEqual(player.stackSize);
      expect(state.bet).toEqual(player.bet);
      expect(state.raise).toEqual(player.raise);
      expect(state.holeCards).toEqual(player.holeCards);
      expect(state.folded).toEqual(player.folded);
      expect(state.away).toEqual(player.away);
      expect(state.showCards).toEqual(player.showCards);
      expect(state.left).toEqual(player.left);
    });

    it('should be able toc convert to state with holeCards', () => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
      poker.dealCards(Ulid.create().get());
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      const state = player.toState();
      expect(state.id).toEqual(player.id);
      expect(state.name).toEqual(player.name);
      expect(state.stackSize).toEqual(player.stackSize);
      expect(state.bet).toEqual(player.bet);
      expect(state.raise).toEqual(player.raise);
      expect(state.holeCards).toEqual([player.holeCards![0].toState(), player.holeCards![1].toState()]);
      expect(state.folded).toEqual(player.folded);
      expect(state.away).toEqual(player.away);
      expect(state.showCards).toEqual(player.showCards);
      expect(state.left).toEqual(player.left);
    });
  });

  describe('privateInfo', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
    });

    it('should be able to get privateInfo', () => {
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      expect(player.privateInfo.holeCards).toHaveLength(0);
      expect(player.privateInfo.hand).toBeUndefined();
    });

    it('should be able to get privateInfo with holeCards', () => {
      poker.dealCards(Ulid.create().get());
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      expect(player.privateInfo.holeCards).toHaveLength(2);
      expect(player.privateInfo.hand).not.toBeUndefined();
    });
  });

  describe('infoForOthers', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
    });

    it('should be able to get infoForOthers', () => {
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      expect(player.infoForOthers.id).toEqual(player.id);
      expect(player.infoForOthers.name).toEqual(player.name);
      expect(player.infoForOthers.stackSize).toEqual(player.stackSize);
      expect(player.infoForOthers.bet).toEqual(player.bet);
      expect(player.infoForOthers.raise).toBeUndefined();
      expect(player.infoForOthers.holeCards).toHaveLength(0);
      expect(player.infoForOthers.folded).toEqual(player.folded);
      expect(player.infoForOthers.showCards).toEqual(player.showCards);
      expect(player.infoForOthers.left).toEqual(player.left);
      expect(player.infoForOthers.away).toEqual(player.away);
      expect(player.infoForOthers.hand).toBeUndefined();
    });

    it('should be able to get infoForOthers with holeCards', () => {
      poker.dealCards(Ulid.create().get());
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      expect(player.infoForOthers.id).toEqual(player.id);
      expect(player.infoForOthers.name).toEqual(player.name);
      expect(player.infoForOthers.stackSize).toEqual(player.stackSize);
      expect(player.infoForOthers.bet).toEqual(player.bet);
      expect(player.infoForOthers.raise).toBeUndefined();
      expect(player.infoForOthers.holeCards).toHaveLength(0);
      expect(player.infoForOthers.folded).toEqual(player.folded);
      expect(player.infoForOthers.showCards).toEqual(player.showCards);
      expect(player.infoForOthers.left).toEqual(player.left);
      expect(player.infoForOthers.away).toEqual(player.away);
      expect(player.infoForOthers.hand).toBeUndefined();
    });

    it('should be able to get infoForOthers with showCards', () => {
      poker.dealCards(Ulid.create().get());
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      player.showCards = true;
      expect(player.infoForOthers.id).toEqual(player.id);
      expect(player.infoForOthers.name).toEqual(player.name);
      expect(player.infoForOthers.stackSize).toEqual(player.stackSize);
      expect(player.infoForOthers.bet).toEqual(player.bet);
      expect(player.infoForOthers.raise).toBeUndefined();
      expect(player.infoForOthers.holeCards).toHaveLength(2);
      expect(player.infoForOthers.folded).toEqual(player.folded);
      expect(player.infoForOthers.showCards).toEqual(player.showCards);
      expect(player.infoForOthers.left).toEqual(player.left);
      expect(player.infoForOthers.away).toEqual(player.away);
      expect(player.infoForOthers.hand).not.toBeUndefined();
    });
  });

  describe('hand', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
    });

    it('should be able to get hand', () => {
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      expect(player.hand).toBeUndefined();
    });

    it('should be able to get hand with holeCards', () => {
      poker.dealCards(Ulid.create().get());
      const player = poker.players[PLAYERS.ALICE.SEAT]!;
      expect(player.hand).not.toBeUndefined();
    });
  });

  describe('betAction', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
      poker.dealCards(Ulid.create().get());
      poker.currentActor!.callAction();
      poker.currentActor!.callAction();
      poker.currentActor!.checkAction();
    });

    it('should be able to betAction', () => {
      const player = poker.currentActor!;
      player.betAction(POKER.BIG_BLIND);
      expect(player.bet).toBe(POKER.BIG_BLIND);
    });
  });

  describe('callAction', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
      poker.dealCards(Ulid.create().get());
    });

    it('should be able to callAction', () => {
      const player = poker.currentActor!;
      player.callAction();
      expect(player.bet).toBe(POKER.BIG_BLIND);
    });
  });

  describe('raiseAction', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
      poker.dealCards(Ulid.create().get());
    });

    it('should be able to raiseAction', () => {
      const player = poker.currentActor!;
      player.raiseAction(POKER.BIG_BLIND * 2);
      expect(player.bet).toBe(POKER.BIG_BLIND * 2);
      expect(player.raise).toBe(POKER.BIG_BLIND);
    });
  });

  describe('checkAction', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
      poker.dealCards(Ulid.create().get());
      poker.currentActor!.callAction();
      poker.currentActor!.callAction();
      poker.currentActor!.checkAction();
      poker.currentActor!.checkAction();
    });

    it('should be able to checkAction', () => {
      const player = poker.currentActor!;
      console.log(player);
      player.checkAction();
      expect(player.bet).toBe(0);
    });
  });

  describe('foldAction', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
      poker.dealCards(Ulid.create().get());
    });

    it('should be able to foldAction', () => {
      const player = poker.currentActor!;
      player.foldAction();
      expect(player.folded).toBeTruthy();
    });
  });

  describe('legalActions', () => {
    beforeEach(() => {
      poker.sitDown(PLAYERS.ALICE.ID, PLAYERS.ALICE.NAME, PLAYERS.ALICE.STACK, PLAYERS.ALICE.SEAT);
      poker.sitDown(PLAYERS.BOB.ID, PLAYERS.BOB.NAME, PLAYERS.BOB.STACK, PLAYERS.BOB.SEAT);
      poker.sitDown(PLAYERS.CHARLIE.ID, PLAYERS.CHARLIE.NAME, PLAYERS.CHARLIE.STACK, PLAYERS.CHARLIE.SEAT);
      poker.dealCards(Ulid.create().get());
    });

    it('should be able to get legalActions', () => {
      expect(poker.currentRound).toEqual(new BettingRound('PRE_FLOP'));
      let player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CALL', 'RAISE', 'FOLD']);
      player.callAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CALL', 'RAISE', 'FOLD']);
      player.raiseAction(POKER.BIG_BLIND * 2);
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CALL', 'RAISE', 'FOLD']);
      player.callAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CALL', 'RAISE', 'FOLD']);
      expect(poker.currentRound).toEqual(new BettingRound('PRE_FLOP'));
      player.callAction();
      expect(poker.currentRound).toEqual(new BettingRound('FLOP'));
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      player.checkAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      player.checkAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      expect(poker.currentRound).toEqual(new BettingRound('FLOP'));
      player.checkAction();
      expect(poker.currentRound).toEqual(new BettingRound('TURN'));
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      player.checkAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      player.checkAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      expect(poker.currentRound).toEqual(new BettingRound('TURN'));
      player.checkAction();
      expect(poker.currentRound).toEqual(new BettingRound('RIVER'));
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      player.checkAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      player.checkAction();
      player = poker.currentActor!;
      expect(player.legalActions()).toEqual(['CHECK', 'BET', 'FOLD']);
      expect(poker.currentRound).toEqual(new BettingRound('RIVER'));
      player.checkAction();
      expect(poker.currentRound).toBeUndefined();
    });
  });
});
