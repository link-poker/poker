import { useTable } from 'hooks/useTable';

export default function GameInfoContainer() {
  const { table } = useTable();
  const owner = table.owner.name || '';
  const currency = table.currency || '';
  const smallBlind = table.poker.smallBlind || '';
  const bigBlind = table.poker.bigBlind || '';
  const buyIn = table.poker.buyIn || '';

  console.log('table', table);

  return (
    <div className='h-[8vh] flex flex-col justify-center items-end'>
      <div className='flex flex-row justify-around text-sm'>
        <div>Owner:</div>
        <div>{owner}</div>
      </div>
      <div className='flex flex-row justify-around text-base gap-2'>
        <div>NLH</div>
        <div>{currency}</div>
        <div>
          {smallBlind}/{bigBlind}
        </div>
      </div>
      <div className='flex flex-row justify-around text-base'>
        <div>Buy-in:</div>
        <div>{buyIn}</div>
      </div>
    </div>
  );
}
