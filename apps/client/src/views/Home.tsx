'use client';
import Image from 'next/image';
import StartButton from '../components/StartButton';

export default function Home() {
  return (
    <div className='h-screen bg-stone-800'>
      <Image alt='home' src='/home.webp' fill style={{ objectFit: 'cover' }} />
      <div className='absolute mt-[40vh] ml-[50vw] transform -translate-y-1/2 -translate-x-1/2'>
        <div className='text-center text-white tracking-widest text-6xl font-bold [text-shadow:_5px_8px_0_rgb(0_0_0_/_70%)]'>
          LinkPoker
        </div>
      </div>
      <div className='absolute mt-[80vh] ml-[50vw] transform -translate-y-1/2 -translate-x-1/2'>
        <StartButton />
      </div>
    </div>
  );
}
