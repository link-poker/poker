import { FastifyReply, FastifyRequest } from 'fastify';
import { UserApplicationService } from '../../services/UserApplicationService';
import { UserData } from '../../dtos/userData';

export class TableHttpController {
  constructor(private readonly userApplicationService: UserApplicationService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, stack } = request.body as { name: string; stack: number };
    const user = await this.userApplicationService.createUser(name, stack);
    const userData = new UserData(user);
    reply.send(userData);
  }
}
