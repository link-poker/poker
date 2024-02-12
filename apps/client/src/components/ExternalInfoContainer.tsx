import { useRouter } from 'next/navigation';
import { useUser } from 'hooks/useUser';

export default function ExternalInfoContainer() {
  const { user } = useUser();
  const router = useRouter();
  const name = user.name == '' ? 'Guest' : user.name;

  const onClickLinkPoker = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-row'>
      <div className='h-[3vh] px-5 flex justify-center items-center bg-stone-600'>
        <button className='text-xl' onClick={onClickLinkPoker}>
          Link Poker
        </button>
      </div>
      <div className='h-[3vh] px-5 flex justify-center items-center bg-stone-500'>
        <p className='text-xl'>{name}</p>
      </div>
    </div>
  );
}
