import { IPlayerInfoForOthersResponse } from '@link-poker/constants';
import { useTable } from 'hooks/useTable';

export default function TotalPot() {
  const { table } = useTable();
  const pod = table.poker.currentPot || 0;
  const totalBet = table.poker.players.reduce(
    (acc: number, player: IPlayerInfoForOthersResponse | null) => acc + (player?.bet || 0),
    0,
  );
  const totalPod = pod + totalBet;
  return (
    <div className='flex flex-row items-end bg-green-800 rounded-xl px-1 gap-1'>
      <div className='text-xs'>total</div>
      <div className='text-xl'>{totalPod}</div>
    </div>
  );
}
