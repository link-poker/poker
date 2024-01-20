export interface IPlayer {
  seat: number;
  name: string;
  stack: number;
  bet: number;
  hole: string[];
  hand: string | null;
  status: string;
  isYou: boolean;
}
