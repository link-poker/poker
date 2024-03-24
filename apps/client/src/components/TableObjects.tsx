import { IPlayerInfoForOthersResponse } from '@link-poker/constants';
import CurrentBet from './CurrentBet';
import DealerButton from './DealerButton';

type Props = {
  player?: IPlayerInfoForOthersResponse;
  seatNumber: number;
};

const BASE: { [seatNumber: number]: boolean } = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: true,
  8: true,
  9: true,
};

const POSITION: { [seatNumber: number]: string } = {
  0: 'ml-52 mt-28',
  1: 'ml-12 mt-28',
  2: '-ml-8 mt-24',
  3: '-ml-12 mt-8',
  4: '-ml-12 -mt-12',
  5: 'ml-12 -mt-16',
  6: 'ml-48 -mt-16',
  7: 'ml-4 -mt-12',
  8: 'ml-6 mt-8',
  9: 'ml-6 mt-24',
};

export default function TableObjects(props: Props) {
  const { player, seatNumber } = props;

  return (
    <div className='flex flex-row'>
      {BASE[seatNumber] && <div className='rounded-lg w-[22vw] xl:w-72' />}
      <div className='relative'>
        <div className={`absolute ${POSITION[seatNumber]} flex flex-row gap-2`}>
          <CurrentBet player={player} />
          <DealerButton player={player} />
        </div>
      </div>
    </div>
  );
}
