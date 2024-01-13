import { SocketStream } from '@fastify/websocket';
import { WebSocketService } from '../../domain/services/WebSocketService';

type Connections = {
  [tableId: string]: {
    [userId: string]: SocketStream;
  };
};

export class WebSocketApplicationService {
  constructor(private readonly webSocketService: WebSocketService) {}

  isAuthorizedConnection(tableId: string, userId: string) {
    this.webSocketService.isAuthorizedConnection(tableId, userId);
  }

  addConnection(tableId: string, userId: string, authToken: string, connection: SocketStream) {
    // TODO: authenticate user with authToken
    console.warn('TODO: authenticate user with authToken');
    // const tokenValidator = new TokenValidator(process.env.JWT_SECRET_KEY || '');
    // const isValid = tokenValidator.validate(authToken);
    // if (!isValid) throw new AuthorizationError('Unauthorized');
    this.webSocketService.addConnection(tableId, userId, connection);
    this.webSocketService.broadcastMessage(tableId, JSON.stringify({ type: 'connect', payload: { userId } }));
  }

  removeConnection(tableId: string, userId: string) {
    this.webSocketService.removeConnection(tableId, userId);
  }

  sendMessage(tableId: string, userId: string, message: string) {
    this.webSocketService.sendMessage(tableId, userId, message);
  }

  broadcastMessage(tableId: string, message: string) {
    this.webSocketService.broadcastMessage(tableId, message);
  }
}
