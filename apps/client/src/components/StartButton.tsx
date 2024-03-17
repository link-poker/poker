import { useRouter } from 'next/navigation';

export default function StartButton() {
  const router = useRouter();

  const navigateToRoomSetup = () => {
    router.push('/table-setup'); // 部屋の設定ページのパスに変更してください
  };

  return (
    <div>
      <button
        className='rounded-md px-6 py-2 font-bold bg-pink-700 hover:bg-pink-800 bg-gradient-radial from-pink-400'
        onClick={navigateToRoomSetup}
      >
        START A NEW GAME
      </button>
    </div>
  );
}
