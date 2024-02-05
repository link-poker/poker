import { BsCircleFill } from 'react-icons/bs';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';
import { useWebSocketServiceContext } from 'providers/WebSocketProvider';
import StartActionContainer from './StartActionContainer';

export default function ActionContainer() {
  const { table } = useTable();
  const { user } = useUser();
  const webSocketService = useWebSocketServiceContext();
  const isOwner = table.owner.id === user.id;
  const isYourTurn = table.poker.currentActor && table.poker.currentActor.id === user.id;
  const isNotEnoughPlayers = table.poker.activePlayers.length < 2;
  const isReadyStart = !table.poker.currentRound && table.poker.activePlayers.length >= 2;
  const isCheck = table.poker.currentActor?.bet === (table.poker.currentBet || 0);

  const onClickBet = () => {
    if (webSocketService) webSocketService.bet();
  };

  const onClickRaise = () => {
    if (webSocketService) webSocketService.raise();
  };

  const onClickCheck = () => {
    if (webSocketService) webSocketService.check();
  };

  const onClickCall = () => {
    if (webSocketService) webSocketService.call();
  };

  const onClickFold = () => {
    if (webSocketService) webSocketService.fold();
  };

  if (isNotEnoughPlayers) return <></>;

  if (isReadyStart) {
    if (!isOwner) return <></>;
    return <StartActionContainer />;
  }

  return (
    <div className='flex flex-col w-[39vw] gap-3 items-end'>
      {isYourTurn && (
        <>
          <div className='flex flex-row justify-end items-center gap-2 text-yellow-300 text-2xl'>
            <BsCircleFill className='blinking' />
            YOUR TURN
          </div>
          <button className='outline-white-btn rounded-lg px-8 py-2 text-2xl whitespace-nowrap'>
            ACTIVATE EXTRA TIME(10s)
          </button>
          <div className='flex flex-row justify-end gap-2'>
            <button className='outline-green-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickBet}>
              BET
            </button>
            <button className='outline-green-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickRaise}>
              RAISE
            </button>
            {isCheck ? (
              <button className='outline-green-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickCheck}>
                CHECK
              </button>
            ) : (
              <button className='outline-green-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickCall}>
                CALL
              </button>
            )}
            <button className='outline-red-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickFold}>
              FOLD
            </button>
          </div>
        </>
      )}
    </div>
  );
}
