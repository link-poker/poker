import { SocketStream } from '@fastify/websocket';
import { WebSocketService } from '../../domain/services/WebSocketService';
import { Ulid } from '../../domain/value-objects/Ulid';

export class WebSocketApplicationService {
  constructor(private readonly webSocketService: WebSocketService) {}

  isAuthorizedConnection(tableIdStr: string, userIdStr: string) {
    const tableId = new Ulid(tableIdStr);
    const userId = new Ulid(userIdStr);
    this.webSocketService.isAuthorizedConnection(tableId, userId);
  }

  addConnection(tableIdStr: string, userIdStr: string, authToken: string, connection: SocketStream) {
    // TODO: authenticate user with authToken
    console.warn('TODO: authenticate user with authToken');
    // const tokenValidator = new TokenValidator(process.env.JWT_SECRET_KEY || '');
    // const isValid = tokenValidator.validate(authToken);
    // if (!isValid) throw new AuthorizationError('Unauthorized');
    const tableId = new Ulid(tableIdStr);
    const userId = new Ulid(userIdStr);
    this.webSocketService.addConnection(tableId, userId, connection);
    this.webSocketService.broadcastMessage(tableId, JSON.stringify({ type: 'connect', payload: { userId } }));
  }

  removeConnection(tableIdStr: string, userIdStr: string) {
    const tableId = new Ulid(tableIdStr);
    const userId = new Ulid(userIdStr);
    this.webSocketService.removeConnection(tableId, userId);
  }

  sendMessage(tableIdStr: string, userIdStr: string, message: string) {
    const tableId = new Ulid(tableIdStr);
    const userId = new Ulid(userIdStr);
    this.webSocketService.sendMessage(tableId, userId, message);
  }

  broadcastMessage(tableIdStr: string, message: string) {
    const tableId = new Ulid(tableIdStr);
    this.webSocketService.broadcastMessage(tableId, message);
  }
}
