import { useTable } from 'hooks/useTable';

export default function Pot() {
  const { table } = useTable();
  const pot = table.poker.currentPot || 0;

  return <div className='text-3xl'>{pot}</div>;
}
