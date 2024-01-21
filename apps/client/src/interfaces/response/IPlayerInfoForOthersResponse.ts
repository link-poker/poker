export interface IPlayerInfoForOthersResponse {
  id: string;
  bet: number;
  raise: number | null;
  holeCards: { rank: string; suit: string }[] | null;
  folded: boolean;
  showCards: boolean;
  left: boolean;
}
