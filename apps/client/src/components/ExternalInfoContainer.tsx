import { useUser } from 'hooks/useUser';

export default function ExternalInfoContainer() {
  const { user } = useUser();
  const name = user.name == '' ? 'Guest' : user.name;
  return (
    <div className='flex flex-row'>
      <div className='h-[3vh] px-5 flex justify-center items-center bg-stone-600'>
        <p className='text-xl'>Link Poker</p>
      </div>
      <div className='h-[3vh] px-5 flex justify-center items-center bg-stone-500'>
        <p className='text-xl'>{name}</p>
      </div>
    </div>
  );
}
