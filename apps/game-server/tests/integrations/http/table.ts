import { FastifyInstance } from 'fastify';

export const createTableAsUser = async (
  app: FastifyInstance,
  body: {
    name: string;
    currency: string;
    smallBlind: number;
    bigBlind: number;
    buyIn: number;
  },
  headers: { authorization: string },
) => {
  const response = await app.inject({
    method: 'POST',
    url: '/tables',
    body,
    headers,
  });
  const data = JSON.parse(response.body);
  return { response: response, table: data.table };
};

export const sitDownAsUser = async (
  app: FastifyInstance,
  tableId: string,
  body: {
    name: string;
    stack: number;
    seatNumber: number;
  },
  headers: { authorization: string },
) => {
  const response = await app.inject({
    method: 'POST',
    url: `/table/${tableId}/sit-down`,
    body,
    headers,
  });
  const data = JSON.parse(response.body);
  return { response: response, table: data.table };
};

export const createTableAsGuest = async (
  app: FastifyInstance,
  body: {
    name: string;
    currency: string;
    smallBlind: number;
    bigBlind: number;
    buyIn: number;
  },
) => {
  const response = await app.inject({
    method: 'POST',
    url: '/tables/guest',
    body,
  });
  const data = JSON.parse(response.body);
  return { response: response, user: data.user, authToken: data.authToken, table: data.table };
};

export const sitDownAsGuest = async (
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
    url: `/table/${tableId}/sit-down/guest`,
    body,
  });
  const data = JSON.parse(response.body);
  return { response: response, user: data.user, authToken: data.authToken, table: data.table };
};

export const getTable = async (app: FastifyInstance, tableId: string) => {
  const response = await app.inject({
    method: 'GET',
    url: `/table/${tableId}`,
  });
  const data = JSON.parse(response.body);
  return { response: response, table: data.table };
};
