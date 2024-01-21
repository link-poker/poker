import { FastifyRequest } from 'fastify';
import { SocketStream } from '@fastify/websocket';
import { wsHandleError } from '../../../error';
import { TableApplicationService } from '../../services/TableApplicationService';
import { WebSocketApplicationService } from '../../services/WebSocketApplicationService';
import {
  IAddOnRequest,
  IBetRequest,
  IConnectRequest,
  IRaiseRequest,
} from '../../../interfaces/request/ITableWsRequest';

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
    connection.socket.on('close', () => {
      this.webSocketApplicationService.removeConnection(params.tableId, params.userId);
    });
    connection.socket.on('message', message => {
      try {
        const data = JSON.parse(message.toString());
        const { type, payload } = data;
        if (type === 'connect') {
          const { authToken } = payload as IConnectRequest;
          this.webSocketApplicationService.addConnection(params.tableId, params.userId, authToken, connection);
        } else {
          this.webSocketApplicationService.isAuthorizedConnection(params.tableId, params.userId);
        }
        switch (type) {
          case 'dealCards':
            this.dealCards(params, payload);
            break;
          case 'standUp':
            this.standUp(params, payload);
            break;
          case 'call':
            this.call(params, payload);
            break;
          case 'check':
            this.check(params, payload);
            break;
          case 'fold':
            this.fold(params, payload);
            break;
          case 'bet':
            this.bet(params, payload);
            break;
          case 'raise':
            this.raise(params, payload);
            break;
          case 'addOn':
            this.addOn(params, payload);
            break;
          case 'delayTime':
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
