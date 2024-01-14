import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthenticateApplicationService } from '../../services/AuthenticateApplicationService';
import { TableApplicationService } from '../../services/TableApplicationService';
import { UserApplicationService } from '../../services/UserApplicationService';
import { UserData } from '../../dtos/userData';
import { TableData } from '../../dtos/tableData';
import { httpHandleError } from '../../../error';

type CreateAsGuestRequest = {
  name: string;
  currency: string;
  smallBlind: number;
  bigBlind: number;
  buyIn: number;
};

export class TableHttpController {
  constructor(
    private readonly authenticateApplicationService: AuthenticateApplicationService,
    private readonly tableApplicationService: TableApplicationService,
    private readonly userApplicationService: UserApplicationService,
  ) {}

  async createAsUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { currency, smallBlind, bigBlind, buyIn } = request.body as CreateAsGuestRequest;
      const authToken = request.headers.authorization;
      const user = this.authenticateApplicationService.authenticate(authToken);
      const table = await this.tableApplicationService.createTable(user, currency, smallBlind, bigBlind, buyIn);
      const tableData = new TableData(table);
      reply.send({ table: tableData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }

  async sitDownAsUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { tableId } = request.params as { tableId: string };
      const { stack, seatNumber } = request.body as { stack: number; seatNumber: number };
      const authToken = request.headers.authorization;
      const user = this.authenticateApplicationService.authenticate(authToken);
      const table = await this.tableApplicationService.sitDown(tableId, user, stack, seatNumber);
      const tableData = new TableData(table);
      reply.send({ table: tableData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }

  async createAsGuest(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, currency, smallBlind, bigBlind, buyIn } = request.body as CreateAsGuestRequest;
      const user = await this.userApplicationService.createUser(name);
      const table = await this.tableApplicationService.createTable(user, currency, smallBlind, bigBlind, buyIn);
      const userData = new UserData(user);
      const tableData = new TableData(table);
      reply.send({ user: userData, table: tableData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }

  async sitDownAsGuest(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { tableId } = request.params as { tableId: string };
      const { name, stack, seatNumber } = request.body as { name: string; stack: number; seatNumber: number };
      const user = await this.userApplicationService.createUser(name);
      const table = await this.tableApplicationService.sitDown(tableId, user, stack, seatNumber);
      const userData = new UserData(user);
      const tableData = new TableData(table);
      reply.send({ user: userData, table: tableData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }
}
