'use client';
import React, { useEffect, useState } from 'react';
import { useWebSocket } from 'hooks/useWebSocket';

const WebSocketContext = React.createContext<WebSocket | null>(null);

export default function WebSocketProvider({ children, url }: { children: React.ReactNode; url: string }) {
  const { updateState } = useWebSocket();
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;
    const ws = new WebSocket(url);

    const onOpen = () => {
      console.log('WebSocket open');
    };

    const onClose = () => {
      console.log('WebSocket close');
    };

    const onMessage = (message: MessageEvent) => {
      console.log('WebSocket message:', message.data);
      updateState(message.data);
    };

    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;

    setWebSocket(ws);

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return <WebSocketContext.Provider value={webSocket}>{children}</WebSocketContext.Provider>;
}

export function useWebSocketContext() {
  const context = React.useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
}
