import { toast } from 'react-hot-toast';

class WebSocketService {
  socket: WebSocket;

  constructor(webSocket: WebSocket) {
    this.socket = webSocket;
  }

  send(message: string) {
    if (this.socket.readyState !== WebSocket.OPEN) return toast.error('WebSocket is not open');
    this.socket.send(message);
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

  bet() {
    this.send(JSON.stringify({ type: 'bet' }));
  }

  raise() {
    this.send(JSON.stringify({ type: 'raise' }));
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
}

export default WebSocketService;
