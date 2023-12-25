import { FastifyReply, FastifyRequest } from 'fastify';
import { TableApplicationService } from '../../services/TableApplicationSerivce';
import { UserData } from '../../dtos/userData';
import { TableData } from '../../dtos/tableData';

export class TableHttpController {
  constructor(private readonly tableApplicationService: TableApplicationService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, stack, currency, smallBlind, bigBlind, buyIn } = request.body as {
      name: string;
      stack: number;
      currency: string;
      smallBlind: number;
      bigBlind: number;
      buyIn: number;
    };
    const { user, table } = await this.tableApplicationService.createTable(
      name,
      stack,
      currency,
      smallBlind,
      bigBlind,
      buyIn,
    );
    const userData = new UserData(user);
    const tableData = new TableData(table);
    reply.send({ user: userData, table: tableData });
  }
}
