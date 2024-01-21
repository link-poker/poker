import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthenticateApplicationService } from '../../services/AuthenticateApplicationService';
import { TableApplicationService } from '../../services/TableApplicationService';
import { UserApplicationService } from '../../services/UserApplicationService';
import { UserData } from '../../dtos/UserData';
import { TableData } from '../../dtos/TableData';
import { httpHandleError } from '../../../error';
import {
  ICreateTableAsUserRequest,
  ISitDownAsUserRequest,
  ICreateTableAsGuestRequest,
  ISitDownAsGuestRequest,
} from '../../../interfaces/request/ITableHttpRequest';

export class TableHttpController {
  constructor(
    private readonly authenticateApplicationService: AuthenticateApplicationService,
    private readonly tableApplicationService: TableApplicationService,
    private readonly userApplicationService: UserApplicationService,
  ) {}

  async createAsUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { currency, smallBlind, bigBlind, buyIn } = request.body as ICreateTableAsUserRequest['body'];
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
      const { tableId } = request.params as ISitDownAsUserRequest['params'];
      const { stack, seatNumber } = request.body as ISitDownAsUserRequest['body'];
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
      const { name, currency, smallBlind, bigBlind, buyIn } = request.body as ICreateTableAsGuestRequest['body'];
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
      const { tableId } = request.params as ISitDownAsGuestRequest['params'];
      const { name, stack, seatNumber } = request.body as ISitDownAsGuestRequest['body'];
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
