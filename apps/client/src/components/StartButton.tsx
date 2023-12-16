import { useRouter } from 'next/navigation';

export default function StartButton() {
  const router = useRouter();

  const navigateToRoomSetup = () => {
    router.push('/table-setup'); // 部屋の設定ページのパスに変更してください
  };

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={navigateToRoomSetup}
      >
        START A NEW GAME
      </button>
    </div>
  );
}
