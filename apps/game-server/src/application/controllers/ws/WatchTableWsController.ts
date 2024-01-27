import { SocketStream } from '@fastify/websocket';
import { FastifyRequest } from 'fastify';
import { wsHandleError } from '../../../error';
import { WebSocketApplicationService } from '../../services/WebSocketApplicationService';

export class WatchTableWsController {
  constructor(private readonly webSocketApplicationService: WebSocketApplicationService) {}

  async handle(connection: SocketStream, request: FastifyRequest) {
    const params = request.params as { tableId: string };
    connection.socket.on('close', () => {
      this.webSocketApplicationService.removeWatcherConnection(params.tableId, connection);
    });
    connection.socket.on('open', () => {
      try {
        this.webSocketApplicationService.addWatcherConnection(params.tableId, connection);
      } catch (error) {
        wsHandleError(error, connection, request);
      }
    });
  }
}
