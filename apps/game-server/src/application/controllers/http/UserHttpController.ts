import { FastifyReply, FastifyRequest } from 'fastify';
import { httpHandleError } from '../../../error';
import { UserData } from '../../dtos/UserData';
import { UserApplicationService } from '../../services/UserApplicationService';

export class UserHttpController {
  constructor(private readonly userApplicationService: UserApplicationService) {}

  async getUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as { userId: string };
      const user = await this.userApplicationService.getUser(userId);
      const userData = new UserData(user);
      reply.send({ user: userData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }
}
