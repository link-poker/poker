import { SocketStream } from '@fastify/websocket';
import { Ulid } from '../value-objects/Ulid';

type Connections = Map<string, SocketStream>;

type WatcherConnections = Map<string, SocketStream[]>;

export class WebSocketService {
  connections: Connections;
  watcherConnections: WatcherConnections;

  constructor() {
    this.connections = new Map();
    this.watcherConnections = new Map();
  }

  addConnection(tableId: Ulid, userId: Ulid, connection: SocketStream) {
    this.connections.set(tableId.get() + ':' + userId.get(), connection);
    this.addWatcherConnection(tableId, connection);
  }

  addWatcherConnection(tableId: Ulid, connection: SocketStream) {
    if (this.watcherConnections.get(tableId.get())?.includes(connection)) return;
    this.watcherConnections.set(tableId.get(), [...(this.watcherConnections.get(tableId.get()) || []), connection]);
  }

  removeConnection(tableId: Ulid, userId: Ulid) {
    this.removeWatcherConnection(tableId, this.connections.get(tableId.get() + ':' + userId.get())!);
    this.connections.delete(tableId.get() + ':' + userId.get());
  }

  removeWatcherConnection(tableId: Ulid, connection: SocketStream) {
    this.watcherConnections.set(
      tableId.get(),
      this.watcherConnections.get(tableId.get())?.filter(conn => conn !== connection) || [],
    );
  }

  sendMessage(tableId: Ulid, userId: Ulid, message: string) {
    this.connections.get(tableId.get() + ':' + userId.get())?.socket.send(message);
  }

  broadcastMessage(tableId: Ulid, message: string) {
    this.watcherConnections.get(tableId.get())?.forEach(connection => connection.socket.send(message));
  }
}
