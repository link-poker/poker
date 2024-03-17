import { useWebSocketServiceContext } from 'providers/WebSocketProvider';

export default function StartActionContainer() {
  const webSocketService = useWebSocketServiceContext();

  // TODO: shuffle seats
  // const onClickShuffleSeats = () => {
  //   if (webSocketService) webSocketService.shuffleSeats();
  // };

  const onClickStartGame = () => {
    if (webSocketService) webSocketService.dealCards();
  };

  return (
    <div className='flex flex-col w-[39vw] gap-3 items-end'>
      <div className='flex flex-row justify-end gap-2'>
        {/* <button className='outline-white-btn rounded-xl px-6 py-6 text-xl'>SHUFFLE SEATS</button> */}
        <button className='cyan-btn rounded-xl px-6 py-6 text-xl' onClick={onClickStartGame}>
          START GAME
        </button>
      </div>
    </div>
  );
}
