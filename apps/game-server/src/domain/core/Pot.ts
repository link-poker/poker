import { Player, PlayerState } from './Player';
import { Poker } from './Poker';

export type PotState = {
  amount: number;
  eligiblePlayers: PlayerState[];
  winners?: PlayerState[];
};

export class Pot {
  amount: number = 0;
  eligiblePlayers: Player[] = [];
  winners?: Player[];

  static initFromState(state: PotState, poker: Poker) {
    const { amount, eligiblePlayers, winners } = state;
    const pot = new Pot();
    pot.amount = amount;
    pot.eligiblePlayers = eligiblePlayers.map((playerState: PlayerState) => Player.initFromState(playerState, poker));
    pot.winners = winners?.map(playerState => Player.initFromState(playerState, poker));
    return pot;
  }

  toState() {
    return {
      amount: this.amount,
      eligiblePlayers: this.eligiblePlayers.map(player => player.toState()),
      winners: this.winners?.map(player => player.toState()),
    };
  }

  restoreState(state: PotState, poker: Poker) {
    const { amount, eligiblePlayers, winners } = state;
    this.amount = amount;
    this.eligiblePlayers = eligiblePlayers.map((playerState: PlayerState) => {
      const player = poker.players.find((p: Player | undefined) => p?.id === playerState.id);
      return player || Player.initFromState(playerState, poker);
    });
    this.winners = winners?.map(playerState => {
      const player = poker.players.find((p: Player | undefined) => p?.id === playerState.id);
      return player || Player.initFromState(playerState, poker);
    });
  }
}
