import { IoMdMenu } from 'react-icons/io';
import { GrLogout } from 'react-icons/gr';
import { IoIosMan } from 'react-icons/io';

type Props = {
  showOptionsView: () => void;
};

export default function TopLeftButtons(props: Props) {
  const { showOptionsView } = props;
  return (
    <div className='h-[27vh] w-[9vh] flex flex-col justify-center items-center text-xs border rounded'>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <button onClick={showOptionsView}>
          <IoMdMenu size={50} />
          OPTIONS
        </button>
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <div className='m-3'>
          <GrLogout size={30} />
        </div>
        LEAVE SEAT
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <div className='m-2'>
          <IoIosMan size={40} />
        </div>
        AWAY
      </div>
    </div>
  );
}
