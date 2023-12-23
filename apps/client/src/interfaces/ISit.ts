import { IPlayer } from 'interfaces/IPlayer';

export default interface ISit {
  player: IPlayer | null;
  position: number;
}
