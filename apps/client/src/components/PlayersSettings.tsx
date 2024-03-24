import { IPlayerInfoForOthersResponse } from '@link-poker/constants';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';

export default function PlayersSetting() {
  const { user } = useUser();
  const { table } = useTable();
  const isYou = (player: IPlayerInfoForOthersResponse) => player.name === user?.name;
  const players: IPlayerInfoForOthersResponse[] =
    (table?.poker.players.filter(
      (player: IPlayerInfoForOthersResponse | undefined) => !!player,
    ) as IPlayerInfoForOthersResponse[]) ?? [];

  return (
    <div className='flex flex-col h-[85vh] w-full p-8 overflow-auto'>
      {players.map(player => (
        <div
          className='flex flex-row justify-between items-center w-full border border-white rounded-2xl mb-8 p-4'
          key={player.name}
        >
          <div className='flex flex-col justify-center items-start h-24 ml-8 gap-2'>
            <div className='text-4xl'>{player.name}</div>
            <div className='text-2xl'>Playing with {player.stack} stack</div>
          </div>
          {isYou(player) && <button className='outline-white-btn p-6 rounded-xl text-4xl'>EDIT</button>}
        </div>
      ))}
    </div>
  );
}
