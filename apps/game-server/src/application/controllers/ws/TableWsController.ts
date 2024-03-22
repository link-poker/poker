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
    connection.socket.on('message', message => {
      try {
        const data = JSON.parse(message.toString());
        const { kind, payload } = data;
        const user = this.webSocketApplicationService.isAuthorizedConnection(
          params.tableId,
          params.userId,
          authToken,
          connection,
        );

        switch (kind as WebSocketMessageKindEnum) {
          case 'ENTER':
            this.enter(params, payload, user);
            break;
          case 'DEAL_CARDS':
            this.dealCards(params, payload);
            break;
          case 'STAND_UP':
            this.standUp(params, payload);
            break;
          case 'CALL':
            this.call(params, payload);
            break;
          case 'CHECK':
            this.check(params, payload);
            break;
          case 'FOLD':
            this.fold(params, payload);
            break;
          case 'BET':
            this.bet(params, payload);
            break;
          case 'RAISE':
            this.raise(params, payload);
            break;
          case 'ADD_ON':
            this.addOn(params, payload);
            break;
          case 'DELAY_TIME':
            this.delayTime(params, payload);
            break;
          default:
            break;
        }
      } catch (error) {
        wsHandleError(error, connection, request);
      }
    });
  }

  private async enter(params: Params, payload: any, user: User) {
    await this.tableApplicationService.enter(params.tableId, user);
  }

  private async dealCards(params: Params, payload: any) {
    await this.tableApplicationService.dealCards(params.tableId, params.userId);
  }

  private async standUp(params: Params, payload: any) {
    await this.tableApplicationService.standUp(params.tableId, params.userId);
  }

  private async call(params: Params, payload: any) {
    await this.tableApplicationService.call(params.tableId, params.userId);
  }

  private async check(params: Params, payload: any) {
    await this.tableApplicationService.check(params.tableId, params.userId);
  }

  private async fold(params: Params, payload: any) {
    await this.tableApplicationService.fold(params.tableId, params.userId);
  }

  private async bet(params: Params, payload: any) {
    const { amount } = payload as IBetRequest;
    await this.tableApplicationService.bet(params.tableId, params.userId, amount);
  }

  private async raise(params: Params, payload: any) {
    const { amount } = payload as IRaiseRequest;
    await this.tableApplicationService.raise(params.tableId, params.userId, amount);
  }

  private async addOn(params: Params, payload: any) {
    const { amount } = payload as IAddOnRequest;
    await this.tableApplicationService.addOn(params.tableId, params.userId, amount);
  }

  private async delayTime(params: Params, payload: any) {}
}
