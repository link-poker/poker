export interface IPlayer {
  seat: number;
  name: string;
  stack: number;
  bet: number;
  hole: string[];
  hand?: string;
  status: string;
  isYou: boolean;
}
