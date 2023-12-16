import { IoMdMenu } from 'react-icons/io';
import { GrLogout } from 'react-icons/gr';
import { IoIosMan } from 'react-icons/io';

export default function TopLeftButtons() {
  return (
    <div className='h-[27vh] w-[9vh] flex flex-col justify-center items-center text-xs border rounded'>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <IoMdMenu size={60} />
        OPTIONS
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <div className='m-3'>
          <GrLogout size={40} />
        </div>
        LEAVE SEAT
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <div className='m-2'>
          <IoIosMan size={50} />
        </div>
        AWAY
      </div>
    </div>
  );
}
