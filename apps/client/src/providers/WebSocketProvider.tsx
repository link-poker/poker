'use client';
import React, { useEffect, useState } from 'react';
import { useWebSocket } from 'hooks/useWebSocket';
import WebSocketService from 'services/WebSocketService';

const WebSocketServiceContext = React.createContext<WebSocketService | null>(null);

export default function WebSocketServiceProvider({ children, url }: { children: React.ReactNode; url: string }) {
  const { updateState } = useWebSocket();
  const [webSocketService, setWebSocketService] = useState<WebSocketService | null>(null);

  useEffect(() => {
    if (!url) return;
    const ws = new WebSocket(url);

    setWebSocketService(new WebSocketService(ws, updateState));

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return <WebSocketServiceContext.Provider value={webSocketService}>{children}</WebSocketServiceContext.Provider>;
}

export function useWebSocketServiceContext() {
  const context = React.useContext(WebSocketServiceContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
}
