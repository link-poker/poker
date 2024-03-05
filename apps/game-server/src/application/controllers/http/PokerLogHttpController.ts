import { IPokerLogRequest } from '@link-poker/constants';
import { FastifyReply, FastifyRequest } from 'fastify';
import { httpHandleError } from '../../../error';
import { PokerLogData } from '../../dtos/PokerLogData';
import { PokerLogApplicationService } from '../../services/PokerLogApplicationService';

export class PokerLogHttpController {
  constructor(private readonly pokerLogApplicationService: PokerLogApplicationService) {}

  async getPokerLog(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { tableId } = request.params as IPokerLogRequest['params'];
      const pokerLogs = await this.pokerLogApplicationService.getManyByTableId(tableId);
      const pokerLog = pokerLogs.map(pokerLog => new PokerLogData(pokerLog));
      reply.send({ pokerLog: pokerLog });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }
}
