import { useForm } from 'react-hook-form';
import { useTable } from 'hooks/useTable';
import { sitDownAsUser } from 'store/slices/sitDownAsUserSlice';

type Props = {
  seatNumber: number;
  setShowForm: (showForm: boolean) => void;
};

type SitDownFormData = {
  stack: number;
};

const POSITION: { [seatNumber: number]: { FORM: string; ARROW: string } } = {
  0: { FORM: 'mt-28', ARROW: 'ml-6 -mt-56' },
  1: { FORM: 'mt-28', ARROW: 'ml-6 -mt-56' },
  2: { FORM: '-ml-72', ARROW: 'ml-56 -mt-48' },
  3: { FORM: '-ml-72', ARROW: 'ml-56 -mt-48' },
  4: { FORM: '-ml-72 -mt-36', ARROW: 'ml-56 -mt-16' },
  5: { FORM: '-mt-64', ARROW: 'ml-6 -mt-6' },
  6: { FORM: '-mt-64', ARROW: 'ml-6 -mt-6' },
  7: { FORM: 'ml-10 -mt-36', ARROW: '-ml-2 -mt-16' },
  8: { FORM: 'ml-10', ARROW: '-ml-2 -mt-48' },
  9: { FORM: 'ml-10', ARROW: '-ml-2 -mt-48' },
};

export default function SitDownForm(props: Props) {
  const { seatNumber, setShowForm } = props;
  const { table, sitDownAsUserAndUpdateState } = useTable();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SitDownFormData>();

  const onSubmit = async (data: SitDownFormData) => {
    console.log('form data', data);
    const response = await sitDownAsUserAndUpdateState({
      params: {
        tableId: table.id,
      },
      body: {
        stack: Number(data.stack),
        seatNumber: seatNumber,
      },
    });
    if (sitDownAsUser.fulfilled.match(response)) {
      console.log('sitDown response', response.payload);
      setShowForm(false);
    }
  };

  return (
    <div className={`absolute ${POSITION[seatNumber].FORM} w-64 z-50`}>
      <form onSubmit={handleSubmit(onSubmit)} className='p-8 bg-white text-stone-800 rounded-3xl'>
        <label className='block'>Your Stack</label>
        <input
          type='number'
          defaultValue={`${table.poker.buyIn}`}
          {...register('stack', { required: true, min: table.poker.buyIn })}
          className='block w-full p-2 mt-2 rounded-md text-base border-2'
        />
        {errors.stack && <p className='text-red-500 text-xs italic'>Input Valid Number</p>}

        <button type='submit' className='green-btn rounded-md p-2 mt-8 w-full'>
          TAKE THE SEAT
        </button>
      </form>
      <div className={`absolute bg-white rotate-45 ${POSITION[seatNumber].ARROW} w-10 h-10 -z-10`} />
    </div>
  );
}
