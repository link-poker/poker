import { WebSocketMessageKindEnum } from '@link-poker/constants';
import { toast } from 'react-hot-toast';

type WebSocketMessage = {
  kind: WebSocketMessageKindEnum;
  payload?: any;
};

class WebSocketService {
  socket: WebSocket;

  constructor(webSocket: WebSocket, updateState: (message: string) => void) {
    this.socket = webSocket;
    this.initialize(updateState);
  }

  isConnected() {
    return this.socket.readyState === WebSocket.OPEN;
  }

  isClosed() {
    return this.socket.readyState === WebSocket.CLOSED;
  }

  reconnect(updateState: (message: string) => void) {
    this.socket = new WebSocket(this.socket.url);
    this.initialize(updateState);
  }

  standUp() {
    this.send({ kind: 'STAND_UP' });
  }

  call() {
    this.send({ kind: 'CALL' });
  }

  check() {
    this.send({ kind: 'CHECK' });
  }

  fold() {
    this.send({ kind: 'FOLD' });
  }

  bet(amount: number) {
    this.send({ kind: 'BET', payload: { amount } });
  }

  raise(amount: number) {
    this.send({ kind: 'RAISE', payload: { amount } });
  }

  addOn() {
    this.send({ kind: 'ADD_ON' });
  }

  delayTime() {
    this.send({ kind: 'DELAY_TIME' });
  }

  enter() {
    this.send({ kind: 'ENTER' });
  }

  dealCards() {
    this.send({ kind: 'DEAL_CARDS' });
  }

  private send(webSocketMessage: WebSocketMessage) {
    if (this.socket.readyState !== WebSocket.OPEN) return toast.error('WebSocket is not open');
    const message = JSON.stringify(webSocketMessage);
    this.socket.send(message);
  }

  private initialize(updateState: (message: string) => void) {
    const onOpen = () => {
      console.log('WebSocket open');
    };

    const onClose = () => {
      console.log('WebSocket close');
    };

    const onMessage = (message: MessageEvent) => {
      console.log('WebSocket message:', JSON.parse(message.data));
      updateState(message.data);
    };

    this.socket.onopen = onOpen;
    this.socket.onclose = onClose;
    this.socket.onmessage = onMessage;
  }
}

export default WebSocketService;
