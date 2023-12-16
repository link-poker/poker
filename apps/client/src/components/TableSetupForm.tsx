import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type TableSetupFormData = {
  currency: string;
  blind: string;
  buyIn: number;
};

export default function TableSetupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TableSetupFormData>();

  const onSubmit = (data: TableSetupFormData) => {
    console.log(data);
    // ここで設定を保存し、新しい部屋に移動するロジックを実装
    router.push('/table'); // 部屋のページのパスに変更してください
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-4 max-w-sm bg-white rounded-lg border shadow-md'>
      {/* Select Currency */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Currency</label>
        <select
          {...register('currency', { required: true })}
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm'
        >
          <option value='POTATO'>POTATO</option>
          <option value='USDT'>USDT</option>
        </select>
        {errors.currency && <p className='text-red-500 text-xs italic'>Select Currency</p>}
      </div>
      {/* Select Blind */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Blind</label>
        <select
          {...register('blind', { required: true })}
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm'
        >
          <option value='1/2'>1/2</option>
          <option value='5/10'>5/10</option>
          <option value='10/20'>10/20</option>
        </select>
        {errors.blind && <p className='text-red-500 text-xs italic'>Blind</p>}
      </div>

      {/* バイインの入力 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Buy-In</label>
        <input
          type='number'
          defaultValue='200'
          {...register('buyIn', { required: true, min: 200 })}
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm'
        />
        {errors.buyIn && <p className='text-red-500 text-xs italic'>Input Valid Number</p>}
      </div>

      {/* 送信ボタン */}
      <button
        type='submit'
        className='w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
      >
        CREATE A NEW table
      </button>
    </form>
  );
}
