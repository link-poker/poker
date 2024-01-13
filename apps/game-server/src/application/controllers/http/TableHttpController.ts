import { FastifyReply, FastifyRequest } from 'fastify';
import { TableApplicationService } from '../../services/TableApplicationService';
import { UserData } from '../../dtos/userData';
import { TableData } from '../../dtos/tableData';
import { UserApplicationService } from '../../services/UserApplicationService';
import { httpHandleError } from '../../../error';

type CreateAsGuestRequest = {
  name: string;
  stack: number;
  seatNumber: number;
  currency: string;
  smallBlind: number;
  bigBlind: number;
  buyIn: number;
};

export class TableHttpController {
  constructor(
    private readonly tableApplicationService: TableApplicationService,
    private readonly userApplicationService: UserApplicationService,
  ) {}

  async createAsGuest(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, stack, seatNumber, currency, smallBlind, bigBlind, buyIn } = request.body as CreateAsGuestRequest;
      const user = await this.userApplicationService.createUser(name, stack, seatNumber);
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
      const user = await this.userApplicationService.createUser(name, stack, seatNumber);
      await this.tableApplicationService.sitDown(tableId, user);
      const userData = new UserData(user);
      reply.send({ user: userData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }
}
