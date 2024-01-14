import fastify, { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import { UserRepository } from './infrastructure/repositories/db/UserRepository';
import { GameRepository } from './infrastructure/repositories/db/GameRepository';
import { TableRepository } from './infrastructure/repositories/db/TableRepository';
import { UserFactory } from './domain/factories/UserFactory';
import { GameFactory } from './domain/factories/GameFactory';
import { TableFactory } from './domain/factories/TableFactory';
import { UserApplicationService } from './application/services/UserApplicationService';
import { TableHttpController } from './application/controllers/http/TableHttpController';
import { TableWsController } from './application/controllers/ws/TableWsController';
import { TableApplicationService } from './application/services/TableApplicationService';
import { WebSocketApplicationService } from './application/services/WebSocketApplicationService';
import { registerRoutes } from './route';
import { WebSocketService } from './domain/services/WebSocketService';
import { AuthenticateApplicationService } from './application/services/AuthenticateApplicationService';

export const createApp = async () => {
  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma);
  const gameRepository = new GameRepository(prisma);
  const tableRepository = new TableRepository(prisma);
  const userFactory = new UserFactory();
  const gameFactory = new GameFactory();
  const tableFactory = new TableFactory();
  const webSocketService = new WebSocketService();
  const authenticateApplicationService = new AuthenticateApplicationService(userRepository);
  const userApplicationService = new UserApplicationService(userFactory, userRepository);
  const tableApplicationService = new TableApplicationService(tableFactory, tableRepository, webSocketService);
  const webSocketApplicationService = new WebSocketApplicationService(webSocketService);
  const tableHttpController = new TableHttpController(
    authenticateApplicationService,
    tableApplicationService,
    userApplicationService,
  );
  const tableWsController = new TableWsController(tableApplicationService, webSocketApplicationService);

  const app: FastifyInstance = fastify({ logger: true });

  app.register(cors, {
    origin: '*',
  });
  app.register(websocket);

  registerRoutes(app, tableHttpController, tableWsController);

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });

  return app;
};
