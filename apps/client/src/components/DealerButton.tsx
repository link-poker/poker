import { IPlayerInfoForOthersResponse } from '@link-poker/constants';
import { useTable } from 'hooks/useTable';

type Props = {
  player: IPlayerInfoForOthersResponse | null;
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
  3: '-ml-8 mt-8',
  4: '-ml-10 -mt-12',
  5: 'ml-12 -mt-16',
  6: 'ml-48 -mt-16',
  7: 'ml-8 -mt-12',
  8: 'ml-8 mt-8',
  9: 'ml-8 mt-24',
};

export default function DealerButton(props: Props) {
  const { player } = props;
  const { table } = useTable();
  const isDealer = player ? table.poker.dealer?.id === player.id : false;

  if (!isDealer) return <></>;

  return (
    <div className='transform -translate-x-1/2 bg-stone-200 px-3 py-1 rounded-full'>
      <div className='text-black text-lg'>D</div>
    </div>
  );
}
