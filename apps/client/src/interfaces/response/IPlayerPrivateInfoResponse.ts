export interface IPlayerPrivateInfoResponse {
  holeCards: { rank: string; suit: string }[] | null;
  hand: string | null;
}
