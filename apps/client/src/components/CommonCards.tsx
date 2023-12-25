import Image from 'next/image';

export default function CommonCards() {
  return (
    <div className='flex justify-center gap-2'>
      <div key={'flop1'}>
        <Image alt='card' src='cards/AH.svg' width={90} height={135} />
      </div>
      <div key={'flop2'}>
        <Image alt='card' src='cards/2C.svg' width={90} height={135} />
      </div>
      <div key={'flop3'}>
        <Image alt='card' src='cards/7D.svg' width={90} height={135} />
      </div>
      <div key={'turn'}>
        <Image alt='card' src='cards/5S.svg' width={90} height={135} />
      </div>
      <div key={'river'}>
        <Image alt='card' src='cards/Blue_Back.svg' width={90} height={135} />
      </div>
    </div>
  );
}
