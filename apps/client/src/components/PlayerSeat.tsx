import Image from 'next/image';
import { FaTrophy } from 'react-icons/fa';
import { ImLoop } from 'react-icons/im';

type Props = {
  player: {
    name: string;
    stack: number;
    bet: number;
    hole: string[];
    hand: string | null;
    status: string;
    isYou: boolean;
  } | null;
  game: {
    status: string;
  };
};

export default function PlayerSeat(props: Props) {
  const { player, game } = props;
  if (!player) {
    if (game.status !== 'playing') {
      return <div></div>;
    } else {
      return <div className='m-2 p-4 border border-dashed rounded-lg h-[9vh] w-[18vw]'></div>;
    }
  }

  const getActionBgClassName = (className: string) => {
    if (player.status === 'action') {
      return className + ' bg-white';
    } else {
      return className + ' bg-stone-700';
    }
  };

  const getActionTextClassName = (className: string) => {
    if (player.status === 'action') {
      return className + ' text-stone-700';
    } else {
      return className + ' text-white';
    }
  };

  return (
    <div className={getActionBgClassName('rounded-lg h-[9vh] w-[18vw]')}>
      {player.status === 'action' && (
        <div>
          <div className='absolute mt-[7vh] ml-[12vw] transform -translate-x-1/2'>
            <div className='bg-yellow-300 h-4 w-[12vw]'></div>
          </div>
          <div className='absolute mt-[7vh] ml-[7vw] transform -translate-x-1/2'>
            <div className='bg-red-500 rounded h-4 w-[6vw]'></div>
          </div>
        </div>
      )}
      <div className='absolute -mt-[1vh] ml-[14.25vw] transform -translate-x-1/2'>
        <div className='flex justify-center items-center gap-1 bg-green-600 rounded-2xl h-[2vh] w-[3vw]'>
          <FaTrophy size={10} />
          <div className='text-xs'>19</div>
        </div>
      </div>
      <div className='absolute -mt-[1vh] ml-[17vw] transform -translate-x-1/2'>
        <div className='flex justify-center items-center gap-1 bg-red-400 rounded-2xl h-[2vh] w-[3vw]'>
          <ImLoop size={10} />
          <div className='text-xs'>2</div>
        </div>
      </div>
      <div className='flex flex-row'>
        <div key={'hole1'} className='absolute -mt-2 -ml-8 -rotate-12'>
          <Image alt='card' src={`cards/${player.hole[0]}.svg`} width={80} height={120} />
        </div>
        <div key={'hole2'} className='absolute -mt-2 ml-6 rotate-12'>
          <Image alt='card' src={`cards/${player.hole[1]}.svg`} width={80} height={120} />
        </div>
        {player.hand && (
          <div key={'hole2'} className='absolute mt-20 ml-8 bg-red-400 px-2 rounded-md transform -translate-x-1/2'>
            <div className='text-ms'>{player.hand}</div>
          </div>
        )}
      </div>
      <div className='absolute mt-[1.5vh] ml-[10vw] flex flex-col justify-center items-start'>
        <div className={getActionTextClassName('text-base text-stone-700')}>{player.name}</div>
        <div className={getActionTextClassName('text-lg text-stone-700')}>{player.stack}</div>
      </div>
      {player.isYou && (
        <div>
          <div className='absolute mt-[1.5vh] ml-[17vw]'>
            <div className='text-3xl'>😜</div>
          </div>
          <div className='absolute mt-[2.5vh] ml-[15vw]'>
            <div className='text-4xl'>😃</div>
          </div>
        </div>
      )}
    </div>
  );
}
