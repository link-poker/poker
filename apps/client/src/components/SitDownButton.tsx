import { useEffect, useRef, useState } from 'react';
import SitDownForm from './SitDownForm';

type Props = {
  seatNumber: number;
};

const POSITION: { [seatNumber: number]: boolean } = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: false,
  8: false,
  9: false,
};

export default function SitDownButton(props: Props) {
  const { seatNumber } = props;
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setShowForm(false);
    }
  };

  const onClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={formRef} className='relative flex flex-row'>
      {showForm && POSITION[seatNumber] && <SitDownForm seatNumber={seatNumber} />}
      <div className='rounded-lg h-[9vh] w-[22vw] xl:w-72 border-dashed border-2 border-stone-600'>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <button className='text-xl text-stone-600' onClick={onClick}>
            SIT
          </button>
        </div>
      </div>
      <div className='relative'>{showForm && !POSITION[seatNumber] && <SitDownForm seatNumber={seatNumber} />}</div>
    </div>
  );
}
