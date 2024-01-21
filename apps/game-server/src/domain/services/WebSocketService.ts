import { SocketStream } from '@fastify/websocket';
import { AuthorizationError } from '../../error';
import { Ulid } from '../value-objects/Ulid';

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

  isAuthorizedConnection(tableId: Ulid, userId: Ulid) {
    if (!this.exist(tableId, userId)) {
      throw new AuthorizationError('Unauthorized connection');
    }
  }

  addConnection(tableId: Ulid, userId: Ulid, connection: SocketStream) {
    if (!this.exist(tableId)) this.connections[tableId.get()] = {};
    this.connections[tableId.get()][userId.get()] = connection;
  }

  removeConnection(tableId: Ulid, userId: Ulid) {
    delete this.connections[tableId.get()][userId.get()];
  }

  sendMessage(tableId: Ulid, userId: Ulid, message: string) {
    if (!this.exist(tableId, userId)) return;
    this.connections[tableId.get()][userId.get()].socket.send(message);
  }

  broadcastMessage(tableId: Ulid, message: string) {
    if (!this.exist(tableId)) return;
    Object.values(this.connections[tableId.get()]).forEach(conn => conn.socket.send(message));
  }

  private exist(tableId: Ulid, userId?: Ulid): boolean {
    if (!userId) return !!this.connections[tableId.get()];
    return !!this.connections[tableId.get()] && !!this.connections[tableId.get()][userId.get()];
  }
}
