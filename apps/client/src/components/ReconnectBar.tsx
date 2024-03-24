import { useEffect, useState } from 'react';
import { useTable } from 'hooks/useTable';
import { useWebSocket } from 'hooks/useWebSocket';
import { useWebSocketServiceContext } from 'providers/WebSocketProvider';

type Props = {
  tableId: string;
};

export default function ReconnectBar(props: Props) {
  const { tableId } = props;
  const webSocketService = useWebSocketServiceContext();
  const { updateState } = useWebSocket();
  const { loadTable } = useTable();
  const [showBar, setShowBar] = useState(false);

  const onClick = () => {
    if (webSocketService) webSocketService.reconnect(updateState);
    loadTable(tableId);
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
      {webSocketService && showBar && (
        <div className='w-full py-2 px-4 bg-red-500 text-xl font-semibold'>
          Disconnected from the server because of inactivity, &nbsp;
          <button className='underline' onClick={onClick}>
            click here
          </button>
          &nbsp;to reconnect.
        </div>
      )}
    </div>
  );
}
