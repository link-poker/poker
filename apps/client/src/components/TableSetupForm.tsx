import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTable } from 'hooks/useTable';
import { createTableAsGuest } from 'store/slices/createTableAsGuestSlice';

type TableSetupFormData = {
  currency: string;
  blind: string;
  buyIn: number;
  name: string;
};

export default function TableSetupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TableSetupFormData>();
  const { createTableAsGuestAndUpdateState } = useTable();

  const onSubmit = async (data: TableSetupFormData) => {
    console.log('form data', data);
    const response = await createTableAsGuestAndUpdateState({
      body: {
        currency: data.currency,
        smallBlind: Number(data.blind.split('/')[0]),
        bigBlind: Number(data.blind.split('/')[1]),
        buyIn: Number(data.buyIn),
        name: data.name,
      },
    });
    if (createTableAsGuest.fulfilled.match(response)) {
      console.log('createTable response', response.payload);
      const tableId = response.payload.table.id;
      router.push('/table/' + tableId);
    } else {
      toast.error('Failed to create table');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='px-12 py-8 bg-stone-800 bg-gradient-radial from-stone-600 rounded-3xl shadow-2xl shadow-black'
    >
      <div className='text-4xl font-bold backdrop p-4 mb-4 tracking-wider'>Table Setup</div>
      <div className='flex flex-col gap-4'>
        {/* Select Currency */}
        <div>
          <label className='block'>Currency</label>
          <select
            {...register('currency', { required: true })}
            className='block w-full p-2 mt-2 bg-slate-200 rounded-md text-sm text-stone-800'
          >
            <option value='POTATO'>POTATO</option>
            <option value='USDT'>USDT</option>
          </select>
          {errors.currency && <p className='text-red-500 text-xs italic'>Select Currency</p>}
        </div>
        {/* Select Blind */}
        <div>
          <label className='block'>Blind</label>
          <select
            {...register('blind', { required: true })}
            className='block w-full p-2 mt-2 bg-slate-200 rounded-md text-sm text-stone-800'
          >
            <option value='1/2'>1/2</option>
            <option value='5/10'>5/10</option>
            <option value='10/20'>10/20</option>
          </select>
          {errors.blind && <p className='text-red-500 text-xs italic'>Blind</p>}
        </div>

        {/* バイインの入力 */}
        <div>
          <label className='block'>Buy-In</label>
          <input
            type='number'
            defaultValue='200'
            {...register('buyIn', { required: true, min: 200 })}
            className='block w-full p-2 mt-2 bg-slate-200 rounded-md text-sm text-stone-800'
          />
          {errors.buyIn && <p className='text-red-500 text-xs italic'>Input Valid Number</p>}
        </div>

        {/* 名前の入力 */}
        <div>
          <label className='block'>Name</label>
          <input
            type='text'
            {...register('name', { required: true })}
            className='block w-full p-2 mt-2 bg-slate-200 rounded-md text-sm text-stone-800'
          />
          {errors.buyIn && <p className='text-red-500 text-xs italic'>Input Valid Number</p>}
        </div>

        {/* 送信ボタン */}
        <button type='submit' className='cyan-btn rounded-md px-6 py-2 mt-8'>
          CREATE A NEW TABLE
        </button>
      </div>
    </form>
  );
}
