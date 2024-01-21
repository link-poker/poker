export interface IPlayerInfoForOthersResponse {
  id: string;
  name: string;
  bet: number;
  raise: number | null;
  holeCards: { rank: string; suit: string }[] | null;
  folded: boolean;
  showCards: boolean;
  left: boolean;
  hand: string | null;
}
