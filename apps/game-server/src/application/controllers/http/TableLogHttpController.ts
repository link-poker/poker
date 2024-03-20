import { ITableLogRequest } from '@link-poker/constants';
import { FastifyReply, FastifyRequest } from 'fastify';
import { httpHandleError } from '../../../error';
import { TableLogData } from '../../dtos/TableLogData';
import { TableLogApplicationService } from '../../services/TableLogApplicationService';

export class TableLogHttpController {
  constructor(private readonly tableLogApplicationService: TableLogApplicationService) {}

  async getTableLog(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { tableId } = request.params as ITableLogRequest['params'];
      const tableLogs = await this.tableLogApplicationService.getManyByTableId(tableId);
      const tableLog = tableLogs.map(tableLog => new TableLogData(tableLog));
      reply.send({ tableLog: tableLog });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }
}
