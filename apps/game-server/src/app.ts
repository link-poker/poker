import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { PrismaClient } from '@prisma/client';
import fastify, { FastifyInstance } from 'fastify';
import { PokerLogHttpController } from './application/controllers/http/PokerLogHttpController';
import { TableHttpController } from './application/controllers/http/TableHttpController';
import { UserHttpController } from './application/controllers/http/UserHttpController';
import { TableWsController } from './application/controllers/ws/TableWsController';
import { WatchTableWsController } from './application/controllers/ws/WatchTableWsController';
import { AuthenticateApplicationService } from './application/services/AuthenticateApplicationService';
import { PokerLogApplicationService } from './application/services/PokerLogApplicationService';
import { TableApplicationService } from './application/services/TableApplicationService';
import { UserApplicationService } from './application/services/UserApplicationService';
import { WebSocketApplicationService } from './application/services/WebSocketApplicationService';
import { WebSocketService } from './domain/services/WebSocketService';
import { PokerLogRepository } from './infrastructure/repositories/db/PokerLogRepository';
import { TableRepository } from './infrastructure/repositories/db/TableRepository';
import { UserRepository } from './infrastructure/repositories/db/UserRepository';
import { registerRoutes } from './route';

export const createApp = async () => {
  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma);
  const pokerLogRepository = new PokerLogRepository(prisma);
  const tableRepository = new TableRepository(prisma);
  const webSocketService = new WebSocketService();
  const authenticateApplicationService = new AuthenticateApplicationService(userRepository);
  const pokerLogApplicationService = new PokerLogApplicationService(pokerLogRepository);
  const userApplicationService = new UserApplicationService(userRepository);
  const tableApplicationService = new TableApplicationService(tableRepository, pokerLogRepository, webSocketService);
  const webSocketApplicationService = new WebSocketApplicationService(webSocketService);
  const pokerLogHttpController = new PokerLogHttpController(pokerLogApplicationService);
  const tableHttpController = new TableHttpController(
    authenticateApplicationService,
    tableApplicationService,
    userApplicationService,
  );
  const userHttpController = new UserHttpController(userApplicationService);
  const tableWsController = new TableWsController(tableApplicationService, webSocketApplicationService);
  const watchTableWsController = new WatchTableWsController(webSocketApplicationService);

  const app: FastifyInstance = fastify({ logger: true });

  app.register(cors, {
    origin: '*',
  });
  app.register(websocket);

  registerRoutes(
    app,
    tableHttpController,
    pokerLogHttpController,
    userHttpController,
    tableWsController,
    watchTableWsController,
  );

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });

  return app;
};
