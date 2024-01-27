import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-8 bg-stone-800 rounded-3xl'>
      {/* Select Currency */}
      <div className='mb-4'>
        <label className='block'>Currency</label>
        <select
          {...register('currency', { required: true })}
          className='block w-full p-2 mt-2 bg-white rounded-md text-sm text-stone-800'
        >
          <option value='POTATO'>POTATO</option>
          <option value='USDT'>USDT</option>
        </select>
        {errors.currency && <p className='text-red-500 text-xs italic'>Select Currency</p>}
      </div>
      {/* Select Blind */}
      <div className='mb-4'>
        <label className='block'>Blind</label>
        <select
          {...register('blind', { required: true })}
          className='block w-full p-2 mt-2 bg-white rounded-md text-sm text-stone-800'
        >
          <option value='1/2'>1/2</option>
          <option value='5/10'>5/10</option>
          <option value='10/20'>10/20</option>
        </select>
        {errors.blind && <p className='text-red-500 text-xs italic'>Blind</p>}
      </div>

      {/* バイインの入力 */}
      <div className='mb-4'>
        <label className='block'>Buy-In</label>
        <input
          type='number'
          defaultValue='200'
          {...register('buyIn', { required: true, min: 200 })}
          className='block w-full p-2 mt-2 bg-white rounded-md text-sm text-stone-800'
        />
        {errors.buyIn && <p className='text-red-500 text-xs italic'>Input Valid Number</p>}
      </div>

      {/* 名前の入力 */}
      <div className='mb-4'>
        <label className='block'>Name</label>
        <input
          type='text'
          {...register('name', { required: true })}
          className='block w-full p-2 mt-2 bg-white rounded-md text-sm text-stone-800'
        />
        {errors.buyIn && <p className='text-red-500 text-xs italic'>Input Valid Number</p>}
      </div>

      {/* 送信ボタン */}
      <button type='submit' className='green-btn rounded-md p-2 mt-8'>
        CREATE A NEW TABLE
      </button>
    </form>
  );
}
