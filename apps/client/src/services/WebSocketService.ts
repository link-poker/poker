import { getTableWsUrl } from 'utils/url';
import { getAuthInfo } from '../utils/authInfo';

class WebSocketService {
  url: string;
  socket: WebSocket | null;

  constructor(tableId: string, userId: string) {
    this.url = getTableWsUrl(tableId, userId);
    this.socket = null;
  }

  connect() {
    const authInfo = getAuthInfo();
    const wsUrl = authInfo?.authToken ? `${this.url}?authToken=${authInfo.authToken}` : this.url;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    this.socket.onerror = error => {
      console.error('WebSocket Error', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket Closed');
    };
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketService;
