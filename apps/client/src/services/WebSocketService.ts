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
    this.socket.send(JSON.stringify({ type: 'standUp' }));
  }

  call() {
    this.socket.send(JSON.stringify({ type: 'call' }));
  }

  check() {
    this.socket.send(JSON.stringify({ type: 'check' }));
  }

  fold() {
    this.socket.send(JSON.stringify({ type: 'fold' }));
  }

  bet() {
    this.socket.send(JSON.stringify({ type: 'bet' }));
  }

  raise() {
    this.socket.send(JSON.stringify({ type: 'raise' }));
  }

  addOn() {
    this.socket.send(JSON.stringify({ type: 'addOn' }));
  }

  delayTime() {
    this.socket.send(JSON.stringify({ type: 'delayTime' }));
  }

  enter() {
    this.socket.send(JSON.stringify({ type: 'enter' }));
  }

  dealCards() {
    this.socket.send(JSON.stringify({ type: 'dealCards' }));
  }
}

export default WebSocketService;
