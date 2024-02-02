import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';
import { sitDownAsGuest } from 'store/slices/sitDownAsGuestSlice';
import { sitDownAsUser } from 'store/slices/sitDownAsUserSlice';

type Props = {
  seatNumber: number;
  setShowForm: (showForm: boolean) => void;
};

type SitDownFormData = {
  stack: number;
  name: string;
};

const POSITION: { [seatNumber: number]: { FORM: string; ARROW: string } } = {
  0: { FORM: 'mt-28', ARROW: 'ml-6 -mt-3' },
  1: { FORM: 'mt-28', ARROW: 'ml-6 -mt-3' },
  2: { FORM: '-ml-72', ARROW: 'ml-56 mt-6' },
  3: { FORM: '-ml-72', ARROW: 'ml-56 mt-6' },
  4: { FORM: '-ml-72 -mt-52', ARROW: 'ml-56 mt-56' },
  5: { FORM: '-mt-[340px]', ARROW: 'ml-6 mt-[275px]' },
  6: { FORM: '-mt-[340px]', ARROW: 'ml-6 mt-[275px]' },
  7: { FORM: 'ml-10 -mt-52', ARROW: '-ml-2 mt-56' },
  8: { FORM: 'ml-10', ARROW: '-ml-2 mt-6' },
  9: { FORM: 'ml-10', ARROW: '-ml-2 mt-6' },
};

export default function SitDownForm(props: Props) {
  const { seatNumber, setShowForm } = props;
  const { user } = useUser();
  const { table, sitDownAsUserAndUpdateState, sitDownAsGuestAndUpdateState } = useTable();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SitDownFormData>();

  const onSubmit = async (data: SitDownFormData) => {
    console.log('form data', data);
    if (user.id) {
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
      } else {
        toast.error('Failed to sit down');
      }
    } else {
      const response = await sitDownAsGuestAndUpdateState({
        params: {
          tableId: table.id,
        },
        body: {
          stack: Number(data.stack),
          seatNumber: seatNumber,
          name: data.name,
        },
      });
      console.log('response', response);
      if (sitDownAsGuest.fulfilled.match(response)) {
        console.log('sitDown response', response.payload);
        setShowForm(false);
      } else {
        toast.error('Failed to sit down');
      }
    }
  };

  return (
    <div className={`absolute ${POSITION[seatNumber].FORM} w-64 z-50`}>
      <div className={`absolute bg-white rotate-45 ${POSITION[seatNumber].ARROW} w-10 h-10 -z-10`} />
      <form onSubmit={handleSubmit(onSubmit)} className='p-8 bg-white text-stone-800 rounded-3xl'>
        <label className='block'>Your Name</label>
        <input
          type='text'
          defaultValue={`${user.name}`}
          {...register('name')}
          disabled={!!user.id}
          className='block w-full p-2 mt-2 rounded-md text-base border-2'
        />
        {errors.name && <p className='text-red-500 text-xs italic'>Input Valid Name</p>}

        <label className='block mt-4'>Your Stack</label>
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
    </div>
  );
}
