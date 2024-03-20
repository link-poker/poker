import { SocketStream } from '@fastify/websocket';
import { ENV_CONFIG } from '../../config/env';
import { User } from '../../domain/entities/User';
import { WebSocketService } from '../../domain/services/WebSocketService';
import { AuthToken } from '../../domain/value-objects/AuthToken';
import { AuthTokenValidator } from '../../domain/value-objects/AuthTokenValidator';
import { Ulid } from '../../domain/value-objects/Ulid';
import { AuthorizationError } from '../../error';

export class WebSocketApplicationService {
  constructor(private readonly webSocketService: WebSocketService) {}

  isAuthorizedConnection(tableIdStr: string, userIdStr: string, authTokenStr: string, connection: SocketStream): User {
    const authTokenValidator = new AuthTokenValidator(ENV_CONFIG.AUTH_TOKEN_SECRET_KEY_BASE64);
    const authToken = AuthToken.init(authTokenStr);
    const user = authTokenValidator.validate(authToken);
    const userId = new Ulid(userIdStr);
    if (user.id.get() !== userId.get()) {
      throw new AuthorizationError('Unauthorized connection');
    }
    const tableId = new Ulid(tableIdStr);
    this.webSocketService.addConnection(tableId, userId, connection);
    return user;
  }

  addWatcherConnection(tableIdStr: string, connection: SocketStream) {
    const tableId = new Ulid(tableIdStr);
    this.webSocketService.addWatcherConnection(tableId, connection);
  }

  removeConnection(tableIdStr: string, userIdStr: string) {
    const tableId = new Ulid(tableIdStr);
    const userId = new Ulid(userIdStr);
    this.webSocketService.removeConnection(tableId, userId);
  }

  removeWatcherConnection(tableIdStr: string, connection: SocketStream) {
    const tableId = new Ulid(tableIdStr);
    this.webSocketService.removeWatcherConnection(tableId, connection);
  }
}
