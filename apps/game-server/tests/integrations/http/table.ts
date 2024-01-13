// contest.test.ts
import { FastifyInstance } from 'fastify';

export const createTable = async (
  app: FastifyInstance,
  body: {
    name: string;
    stack: number;
    seatNumber: number;
    currency: string;
    smallBlind: number;
    bigBlind: number;
    buyIn: number;
  },
) => {
  const response = await app.inject({
    method: 'POST',
    url: '/tables',
    body,
  });
  const data = JSON.parse(response.body);
  return { response: response, user: data.user, table: data.table };
};

export const sitDown = async (
  app: FastifyInstance,
  tableId: string,
  body: {
    name: string;
    stack: number;
    seatNumber: number;
  },
) => {
  const response = await app.inject({
    method: 'POST',
    url: `/tables/${tableId}/sit-down`,
    body,
  });
  const data = JSON.parse(response.body);
  return { response: response, user: data.user };
};
