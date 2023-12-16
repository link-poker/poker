import { FaVolumeDown } from 'react-icons/fa';

export default function TopRightButtons() {
  return (
    <div className='h-[7vh] w-[7vh] flex flex-col justify-center items-center text-xs border rounded'>
      <FaVolumeDown size={40} />
    </div>
  );
}
