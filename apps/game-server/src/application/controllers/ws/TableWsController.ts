import { FastifyRequest } from 'fastify';
import { SocketStream } from '@fastify/websocket';
import { UserApplicationService } from '../../services/UserApplicationService';
import { UserData } from '../../dtos/userData';

export class TableWsController {
  constructor(private readonly userApplicationService: UserApplicationService) {}

  async playGame(connection: SocketStream, request: FastifyRequest) {
    connection.socket.on('message', async message => {
      const { name, password } = JSON.parse(message.toString());
      const user = await this.userApplicationService.createUser(name, password);
      const userData = new UserData(user);
      connection.socket.send(JSON.stringify(userData));
    });
  }

  async sitDown(connection: SocketStream, request: FastifyRequest) {}

  async standUp(connection: SocketStream, request: FastifyRequest) {}

  async buyIn(connection: SocketStream, request: FastifyRequest) {}

  async action(connection: SocketStream, request: FastifyRequest) {}
}
