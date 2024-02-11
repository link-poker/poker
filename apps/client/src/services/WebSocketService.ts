import { toast } from 'react-hot-toast';

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
    this.send(JSON.stringify({ type: 'standUp' }));
  }

  call() {
    this.send(JSON.stringify({ type: 'call' }));
  }

  check() {
    this.send(JSON.stringify({ type: 'check' }));
  }

  fold() {
    this.send(JSON.stringify({ type: 'fold' }));
  }

  bet(amount: number) {
    this.send(JSON.stringify({ type: 'bet', payload: { amount } }));
  }

  raise(amount: number) {
    this.send(JSON.stringify({ type: 'raise', payload: { amount } }));
  }

  addOn() {
    this.send(JSON.stringify({ type: 'addOn' }));
  }

  delayTime() {
    this.send(JSON.stringify({ type: 'delayTime' }));
  }

  enter() {
    this.send(JSON.stringify({ type: 'enter' }));
  }

  dealCards() {
    this.send(JSON.stringify({ type: 'dealCards' }));
  }

  private send(message: string) {
    if (this.socket.readyState !== WebSocket.OPEN) return toast.error('WebSocket is not open');
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
