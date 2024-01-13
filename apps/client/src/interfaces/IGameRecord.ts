export interface IGameRecord {
  gameId: number;
}

export interface ICommandRecord {
  roomNumber: string;
  gameId: number;
  userId: string;
  type: string;
  pot: number;
  commonCard: string;
  handCard?: string;
  TableStatus: number;
  command: string;
  counter: number;
}
