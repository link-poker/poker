import Image from 'next/image';

export default function CommunityCards() {
  return (
    <div className='flex justify-center m-4'>
      <div key={'flop1'} className='m-1 p-2'>
        <Image alt='card' src='cards/AH.svg' width={120} height={180} />
      </div>
      <div key={'flop2'} className='m-1 p-2'>
        <Image alt='card' src='cards/2C.svg' width={120} height={180} />
      </div>
      <div key={'flop3'} className='m-1 p-2'>
        <Image alt='card' src='cards/7D.svg' width={120} height={180} />
      </div>
      <div key={'turn'} className='m-1 p-2'>
        <Image alt='card' src='cards/5S.svg' width={120} height={180} />
      </div>
      <div key={'river'} className='m-1 p-2'>
        <Image alt='card' src='cards/Blue_Back.svg' width={120} height={180} />
      </div>
    </div>
  );
}
