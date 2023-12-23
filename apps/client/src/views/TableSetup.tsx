'use client';
import Image from 'next/image';
import TableSetupForm from '../components/TableSetupForm';

export default function RoomSetup() {
  return (
    <div className='h-screen w-screen bg-stone-800'>
      <Image alt='tableSetup' src='/tableSetup2.png' fill style={{ objectFit: 'cover' }} />
      <div className='absolute mt-[45vh] ml-[50vw] transform -translate-y-1/2 -translate-x-1/2'>
        <TableSetupForm />
      </div>
    </div>
  );
}
