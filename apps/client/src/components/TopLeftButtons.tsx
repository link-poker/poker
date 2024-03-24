import { toast } from 'react-hot-toast';
import { GrLogout } from 'react-icons/gr';
import { IoMdMenu, IoIosMan } from 'react-icons/io';
import { PiArmchairFill } from 'react-icons/pi';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';
import { useWebSocketServiceContext } from 'providers/WebSocketProvider';

type Props = {
  showOptionsView: () => void;
};

export default function TopLeftButtons(props: Props) {
  const { showOptionsView } = props;
  const { user } = useUser();
  const { table } = useTable();
  const webSocketService = useWebSocketServiceContext();
  const you = table.poker.players.find(player => player?.id === user.id);

  const onClickLeaveSeat = () => {
    if (!webSocketService) return toast.error('WebSocket is not initialized');
    if (!webSocketService.isConnected()) return toast.error('WebSocket is not connected');
    webSocketService.standUp();
  };

  const onClickAway = () => {
    if (!webSocketService) return toast.error('WebSocket is not initialized');
    if (!webSocketService.isConnected()) return toast.error('WebSocket is not connected');
    if (!you) return toast.error('You are not sitting at the table');
    if (you.away) return toast.error('You are already away');
    webSocketService.away();
  };

  const onClickBack = () => {
    if (!webSocketService) return toast.error('WebSocket is not initialized');
    if (!webSocketService.isConnected()) return toast.error('WebSocket is not connected');
    if (!you) return toast.error('You are not sitting at the table');
    if (!you.away) return toast.error('You are not away');
    webSocketService.back();
  };

  return (
    <div className='h-[27vh] w-[9vh] flex flex-col justify-center items-center text-[10px] border rounded'>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <button onClick={showOptionsView}>
          <IoMdMenu size={50} />
          OPTIONS
        </button>
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        <button onClick={onClickLeaveSeat}>
          <div className='m-3'>
            <GrLogout size={30} />
          </div>
          LEAVE SEAT
        </button>
      </div>
      <div className='h-[9vh] w-[9vh] flex flex-col justify-center items-center'>
        {you && you.away ? (
          <button onClick={onClickBack}>
            <PiArmchairFill size={50} />
            I&apos;M BACK
          </button>
        ) : (
          <button onClick={onClickAway}>
            <IoIosMan size={50} />
            AWAY
          </button>
        )}
      </div>
    </div>
  );
}
