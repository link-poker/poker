import { useEffect, useState } from 'react';
import { useWebSocket } from 'hooks/useWebSocket';
import { useWebSocketServiceContext } from 'providers/WebSocketProvider';

export default function ReconnectBar() {
  const webSocketService = useWebSocketServiceContext();
  const { updateState } = useWebSocket();
  const [showBar, setShowBar] = useState(false);

  const onClick = () => {
    if (webSocketService) webSocketService.reconnect(updateState);
    setShowBar(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (webSocketService && webSocketService.isClosed()) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [webSocketService]);

  return (
    <div>
      {webSocketService && showBar ? (
        <div className='w-full py-2 px-4 bg-red-500 text-xl font-semibold'>
          Disconnected from the server because of inactivity, &nbsp;
          <button className='underline' onClick={onClick}>
            click here
          </button>
          &nbsp;to reconnect.
        </div>
      ) : null}
    </div>
  );
}
