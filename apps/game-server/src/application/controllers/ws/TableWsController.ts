import { SocketStream } from '@fastify/websocket';
import { IAddOnRequest, IBetRequest, IRaiseRequest, WebSocketMessageKindEnum } from '@link-poker/constants';
import { FastifyRequest } from 'fastify';
import { User } from '../../../domain/entities/User';
import { wsHandleError } from '../../../error';
import { TableApplicationService } from '../../services/TableApplicationService';
import { WebSocketApplicationService } from '../../services/WebSocketApplicationService';

type Params = {
  tableId: string;
  userId: string;
};

export class TableWsController {
  constructor(
    private readonly tableApplicationService: TableApplicationService,
    private readonly webSocketApplicationService: WebSocketApplicationService,
  ) {}

  async handle(connection: SocketStream, request: FastifyRequest) {
    const params = request.params as { tableId: string; userId: string };
    const authToken = (request.query as { authToken: string }).authToken;
    this.webSocketApplicationService.isAuthorizedConnection(params.tableId, params.userId, authToken, connection);
    connection.socket.on('close', () => {
      this.webSocketApplicationService.removeConnection(params.tableId, params.userId);
    });
    connection.socket.on('message', async message => {
      try {
        const data = JSON.parse(message.toString());
        const { kind, payload } = data as { kind: WebSocketMessageKindEnum; payload: unknown };
        const user = this.webSocketApplicationService.isAuthorizedConnection(
          params.tableId,
          params.userId,
          authToken,
          connection,
        );

        switch (kind) {
          case 'ENTER':
            await this.enter(params, payload, user);
            break;
          case 'DEAL_CARDS':
            await this.dealCards(params, payload);
            break;
          case 'STAND_UP':
            await this.standUp(params, payload);
            break;
          case 'AWAY':
            await this.away(params, payload);
            break;
          case 'BACK':
            await this.back(params, payload);
            break;
          case 'CALL':
            await this.call(params, payload);
            break;
          case 'CHECK':
            await this.check(params, payload);
            break;
          case 'FOLD':
            await this.fold(params, payload);
            break;
          case 'BET':
            await this.bet(params, payload);
            break;
          case 'RAISE':
            await this.raise(params, payload);
            break;
          case 'ADD_ON':
            await this.addOn(params, payload);
            break;
          case 'DELAY_TIME':
            await this.delayTime(params, payload);
            break;
          default:
            break;
        }
      } catch (error) {
        wsHandleError(error, connection, request);
      }
    });
  }

  private async enter(params: Params, payload: unknown, user: User) {
    await this.tableApplicationService.enter(params.tableId, user);
  }

  private async dealCards(params: Params, payload: unknown) {
    await this.tableApplicationService.dealCards(params.tableId, params.userId);
  }

  private async standUp(params: Params, payload: unknown) {
    await this.tableApplicationService.standUp(params.tableId, params.userId);
  }

  private async away(params: Params, payload: unknown) {
    await this.tableApplicationService.away(params.tableId, params.userId);
  }

  private async back(params: Params, payload: unknown) {
    await this.tableApplicationService.back(params.tableId, params.userId);
  }

  private async call(params: Params, payload: unknown) {
    await this.tableApplicationService.call(params.tableId, params.userId);
  }

  private async check(params: Params, payload: unknown) {
    await this.tableApplicationService.check(params.tableId, params.userId);
  }

  private async fold(params: Params, payload: unknown) {
    await this.tableApplicationService.fold(params.tableId, params.userId);
  }

  private async bet(params: Params, payload: unknown) {
    const { amount } = payload as IBetRequest;
    await this.tableApplicationService.bet(params.tableId, params.userId, amount);
  }

  private async raise(params: Params, payload: unknown) {
    const { amount } = payload as IRaiseRequest;
    await this.tableApplicationService.raise(params.tableId, params.userId, amount);
  }

  private async addOn(params: Params, payload: unknown) {
    const { amount } = payload as IAddOnRequest;
    await this.tableApplicationService.addOn(params.tableId, params.userId, amount);
  }

  private async delayTime(params: Params, payload: unknown) {}
}
