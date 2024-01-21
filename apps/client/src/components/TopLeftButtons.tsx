import { IoMdMenu } from 'react-icons/io';
import { GrLogout } from 'react-icons/gr';
import { IoIosMan } from 'react-icons/io';
import { PiArmchairFill } from 'react-icons/pi';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  showOptionsView: () => void;
};

export default function TopLeftButtons(props: Props) {
  // TODO: use redux to store userState
  const [userState, setUserState] = useState('AWAY'); // ['AWAY', 'WAITING', 'PLAYING']
  const { showOptionsView } = props;
  const router = useRouter();

  return (
    <div className='h-[27vh] w-[9vh] flex flex-col justify-center items-center text-xs border rounded'>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <button onClick={showOptionsView}>
          <IoMdMenu size={50} />
          OPTIONS
        </button>
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center' onClick={() => router.push('/')}>
        <button onClick={() => router.push('/')}>
          <div className='m-3'>
            <GrLogout size={30} />
          </div>
          LEAVE SEAT
        </button>
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        {userState === 'AWAY' ? (
          <button onClick={() => setUserState('WAITING')}>
            <PiArmchairFill size={50} />
            I&apos;M BACK
          </button>
        ) : (
          <button onClick={() => setUserState('AWAY')}>
            <IoIosMan size={50} />
            AWAY
          </button>
        )}
      </div>
    </div>
  );
}
