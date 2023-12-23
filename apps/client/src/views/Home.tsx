'use client';
import Image from 'next/image';
import StartButton from '../components/StartButton';

export default function Home() {
  return (
    <div className='h-screen bg-stone-800'>
      <Image alt='home' src='/home.png' fill style={{ objectFit: 'cover' }} />
      <div className='absolute mt-[80vh] ml-[50vw] transform -translate-y-1/2 -translate-x-1/2'>
        <StartButton />
      </div>
    </div>
  );
}
