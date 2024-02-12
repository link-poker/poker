export interface IPlayerInfoForOthersResponse {
  id: string;
  name: string;
  stack: number;
  bet: number;
  raise: number | null;
  holeCards: string[] | null;
  folded: boolean;
  showCards: boolean;
  left: boolean;
  hand: string | null;
}
