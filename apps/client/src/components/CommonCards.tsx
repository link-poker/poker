import Image from 'next/image';
import { useTable } from 'hooks/useTable';

export default function CommonCards() {
  const { table } = useTable();
  const commonCards = table.poker.commonCards;
  const commonCardsLength = commonCards.length;
  const flop1 = commonCardsLength >= 1 ? commonCards[0] : 'Blue_Back';
  const flop2 = commonCardsLength >= 2 ? commonCards[1] : 'Blue_Back';
  const flop3 = commonCardsLength >= 3 ? commonCards[2] : 'Blue_Back';
  const turn = commonCardsLength >= 4 ? commonCards[3] : 'Blue_Back';
  const river = commonCardsLength >= 5 ? commonCards[4] : 'Blue_Back';

  return (
    <div className='flex justify-center gap-2'>
      <div key={'flop1'}>
        <Image alt='card' src={`/cards/${flop1}.svg`} width={90} height={135} />
      </div>
      <div key={'flop2'}>
        <Image alt='card' src={`/cards/${flop2}.svg`} width={90} height={135} />
      </div>
      <div key={'flop3'}>
        <Image alt='card' src={`/cards/${flop3}.svg`} width={90} height={135} />
      </div>
      <div key={'turn'}>
        <Image alt='card' src={`/cards/${turn}.svg`} width={90} height={135} />
      </div>
      <div key={'river'}>
        <Image alt='card' src={`/cards/${river}.svg`} width={90} height={135} />
      </div>
    </div>
  );
}
