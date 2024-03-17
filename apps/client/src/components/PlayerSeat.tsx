import { IPlayerInfoForOthersResponse } from '@link-poker/constants';
import Image from 'next/image';
import { FaTrophy } from 'react-icons/fa';
import { ImLoop } from 'react-icons/im';
import { LuClock9 } from 'react-icons/lu';
import { TABLE_STATUS } from 'constants/table';
import { usePlayerPrivateInfo } from 'hooks/usePlayerPrivateInfo';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';
import SitDownButton from './SitDownButton';
import TableObjects from './TableObjects';

type Props = {
  seatNumber: number;
};

export default function PlayerSeat(props: Props) {
  const { seatNumber } = props;
  const { table } = useTable();
  const { user } = useUser();
  const { playerPrivateInfo } = usePlayerPrivateInfo();
  const playerSeatNumber = table.poker.players.findIndex(
    (player: IPlayerInfoForOthersResponse | null) => player && player.id === user.id,
  );
  const player =
    playerSeatNumber === -1
      ? table.poker.players[seatNumber]
      : table.poker.players[(seatNumber + playerSeatNumber + 5) % 10];
  const isAct = player && table.poker.currentActor?.id === player.id;
  const isYou = player && player.id === user.id;
  const isAlreadySitDown = table.poker.players.some(
    (player: IPlayerInfoForOthersResponse | null) => player && player.id === user.id,
  );
  const holeCardsNullable = isYou ? playerPrivateInfo.holeCards : player ? player.holeCards : null;
  const holeCards = holeCardsNullable && holeCardsNullable.length != 0 ? holeCardsNullable : ['Blue_Back', 'Blue_Back'];
  const hand = isYou ? playerPrivateInfo.hand : player ? player.hand : null;
  const isWinner = table.poker.winners?.find((winner: IPlayerInfoForOthersResponse) => winner.id === player?.id);

  if (!player && table.status === TABLE_STATUS.WAITING && !isAlreadySitDown) {
    return <SitDownButton seatNumber={seatNumber} />;
  }

  if (!player) {
    return <div></div>;
  }

  if (table.status === TABLE_STATUS.WAITING) {
    return (
      <div className='rounded-lg h-[9vh] w-[22vw] xl:w-72 bg-stone-700'>
        <div className='absolute h-[9vh] w-[10vw] flex flex-col justify-center items-center text-stone-300 text-xs gap-2'>
          <LuClock9 size={40} />
          WAITING
        </div>
        <div className='absolute mt-3 ml-32 flex flex-col justify-center items-start'>
          <div className='text-sm text-stone-300'>{player.name}</div>
          <div className='text-base text-white'>{player.stack}</div>
        </div>
        {isYou && (
          <div>
            <div className='absolute mt-[1.5vh] ml-[18vw] xl:ml-52 transform translate-x-3/4'>
              <div className='text-3xl'>😜</div>
            </div>
            <div className='absolute mt-[1.5vh] ml-[18vw] xl:ml-52 transform translate-y-1/4'>
              <div className='text-4xl'>😃</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const getActionBgClassName = (className: string) => {
    if (isWinner) {
      return className + ' bg-white inner-outer-shadow shadow-yellow-200';
    } else if (isAct) {
      return className + ' bg-white';
    } else {
      return className + ' bg-stone-700';
    }
  };

  const getActionTextClassName = (className: string) => {
    if (isWinner || isAct) {
      return className + ' text-stone-700';
    } else {
      return className + ' text-white';
    }
  };

  return (
    <div className={getActionBgClassName('rounded-lg h-[9vh] w-[22vw] xl:w-72')}>
      {isAct && (
        <div>
          <div className='absolute mt-[7vh]'>
            <div className='bg-yellow-300 rounded h-3 w-[22vw] xl:w-72'></div>
          </div>
          <div className='absolute mt-[7vh]'>
            <div className='bg-red-500 h-3 w-40'></div>
          </div>
        </div>
      )}
      <TableObjects player={player} seatNumber={seatNumber} />
      <div className='absolute -mt-2 ml-[16vw] xl:ml-52 transform -translate-x-1/2'>
        <div className='flex justify-center items-center gap-1 bg-cyan-600 rounded-2xl h-[2vh] w-12'>
          <FaTrophy size={10} />
          <div className='text-xs'>19</div>
        </div>
      </div>
      <div className='absolute -mt-2 ml-[16vw] xl:ml-52 transform translate-x-1/2'>
        <div className='flex justify-center items-center gap-1 bg-red-400 rounded-2xl h-[2vh] w-12'>
          <ImLoop size={10} />
          <div className='text-xs'>2</div>
        </div>
      </div>
      <div className='flex flex-row'>
        <div key={'hole1'} className='absolute -mt-3 -ml-4 -rotate-12'>
          <Image alt='card' src={`/cards/${holeCards[0]}.svg`} width={70} height={100} />
        </div>
        <div key={'hole2'} className='absolute -mt-3 ml-8 rotate-12'>
          <Image alt='card' src={`/cards/${holeCards[1]}.svg`} width={70} height={100} />
        </div>
        {hand && (
          <div className='absolute mt-16 ml-10 bg-red-400 px-2 rounded-md transform -translate-x-1/2'>
            <div className='text-ms'>{hand}</div>
          </div>
        )}
      </div>
      <div className='absolute mt-3 ml-32 flex flex-col justify-center items-start'>
        <div className={getActionTextClassName('text-sm text-stone-700')}>{player.name}</div>
        <div className={getActionTextClassName('text-base text-stone-700')}>{player.stack}</div>
      </div>
      {isYou && (
        <div>
          <div className='absolute mt-[1.5vh] ml-[18vw] xl:ml-52 transform translate-x-3/4'>
            <div className='text-3xl'>😜</div>
          </div>
          <div className='absolute mt-[1.5vh] ml-[18vw] xl:ml-52 transform translate-y-1/4'>
            <div className='text-4xl'>😃</div>
          </div>
        </div>
      )}
    </div>
  );
}
