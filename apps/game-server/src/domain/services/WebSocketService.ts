import { SocketStream } from '@fastify/websocket';
import { AuthorizationError } from '../../error';

type Connections = {
  [tableId: string]: {
    [userId: string]: SocketStream;
  };
};

export class WebSocketService {
  connections: Connections = {};

  constructor() {
    this.connections = {};
  }

  isAuthorizedConnection(tableId: string, userId: string) {
    if (this.hasConnection(tableId, userId)) {
      throw new AuthorizationError('Unauthorized connection');
    }
  }

  addConnection(tableId: string, userId: string, connection: SocketStream) {
    if (!this.connections[tableId]) this.connections[tableId] = {};
    this.connections[tableId][userId] = connection;
  }

  removeConnection(tableId: string, userId: string) {
    delete this.connections[tableId][userId];
  }

  sendMessage(tableId: string, userId: string, message: string) {
    if (this.connections[tableId][userId]) {
      this.connections[tableId][userId].socket.send(message);
    }
  }

  broadcastMessage(tableId: string, message: string) {
    if (!this.connections[tableId]) return;
    Object.values(this.connections[tableId]).forEach(conn => conn.socket.send(message));
  }

  private hasConnection(tableId: string, userId: string): boolean {
    return !!this.connections[tableId] && !!this.connections[tableId][userId];
  }
}
