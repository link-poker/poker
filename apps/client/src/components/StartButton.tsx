import { useRouter } from 'next/navigation';

export default function StartButton() {
  const router = useRouter();

  const navigateToRoomSetup = () => {
    router.push('/table-setup'); // 部屋の設定ページのパスに変更してください
  };

  return (
    <div>
      <button className='green-btn' onClick={navigateToRoomSetup}>
        START A NEW GAME
      </button>
    </div>
  );
}
