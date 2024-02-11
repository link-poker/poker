type Props = {
  seatNumber: number;
  currentBet: number;
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

export default function CurrentBet(props: Props) {
  const { seatNumber, currentBet } = props;

  if (currentBet === 0) return <></>;

  return (
    <div className='flex flex-row'>
      {BASE[seatNumber] && <div className='rounded-lg w-[22vw] xl:w-72' />}
      <div className='relative'>
        <div
          className={`absolute ${POSITION[seatNumber]} transform -translate-x-1/2 bg-yellow-200 px-3 py-1 rounded-full`}
        >
          <div className='text-black text-base'>{currentBet}</div>
        </div>
      </div>
    </div>
  );
}
