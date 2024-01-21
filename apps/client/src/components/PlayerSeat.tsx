import { usePlayerPrivateInfo } from 'hooks/usePlayerPrivateInfo';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';
import Image from 'next/image';
import { FaTrophy } from 'react-icons/fa';
import { ImLoop } from 'react-icons/im';

type Props = {
  seatNumber: number;
};

export default function PlayerSeat(props: Props) {
  const { seatNumber } = props;
  const { table } = useTable();
  const { user } = useUser();
  const { playerPrivateInfo } = usePlayerPrivateInfo();
  const player = table.poker.players[seatNumber];
  const isAct = player && table.poker.actingPlayers.includes(player);
  const isYou = player ? player.id === user.id : false;
  const holeCardsNullable = isYou ? playerPrivateInfo.holeCards : player ? player.holeCards : null;
  const holeCards = holeCardsNullable
    ? holeCardsNullable.map(card => card.rank + card.suit)
    : ['Blue_Back', 'Blue_Back'];

  if (!player) {
    return <div></div>;
  }

  if (table.status === 'WAITING') {
    return (
      <div className='rounded-lg h-[9vh] w-[22vw] xl:w-72 bg-stone-700'>
        <div className='absolute mt-3 ml-32 flex flex-col justify-center items-start'>
          <div className='text-sm text-stone-700'>{player.name}</div>
          <div className='text-base text-stone-700'>{player.stack}</div>
        </div>
      </div>
    );
  }

  const getActionBgClassName = (className: string) => {
    if (isAct) {
      return className + ' bg-white';
    } else {
      return className + ' bg-stone-700';
    }
  };

  const getActionTextClassName = (className: string) => {
    if (isAct) {
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
            <div className='bg-yellow-300 rounded h-4 w-[22vw] xl:w-72'></div>
          </div>
          <div className='absolute mt-[7vh]'>
            <div className='bg-red-500 h-4 w-40'></div>
          </div>
        </div>
      )}
      <div className='absolute -mt-2 ml-[16vw] xl:ml-52 transform -translate-x-1/2'>
        <div className='flex justify-center items-center gap-1 bg-green-600 rounded-2xl h-[2vh] w-12'>
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
        <div key={'hole1'} className='absolute -mt-2 -ml-4 -rotate-12'>
          <Image alt='card' src={`/cards/${holeCards[0]}.svg`} width={80} height={120} />
        </div>
        <div key={'hole2'} className='absolute -mt-2 ml-8 rotate-12'>
          <Image alt='card' src={`/cards/${holeCards[1]}.svg`} width={80} height={120} />
        </div>
        {player.hand && (
          <div className='absolute mt-20 bg-red-400 px-2 rounded-md transform -translate-x-1/4'>
            <div className='text-ms'>{player.hand}</div>
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
