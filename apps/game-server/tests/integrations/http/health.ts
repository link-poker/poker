import { FastifyInstance } from 'fastify';

export const health = async (app: FastifyInstance) => {
  const response = await app.inject({
    method: 'GET',
    url: '/health',
  });
  const data = JSON.parse(response.body);
  return { response, status: data.status };
};

export const dbHealth = async (app: FastifyInstance) => {
  const response = await app.inject({
    method: 'GET',
    url: '/health/db',
  });
  const data = JSON.parse(response.body);
  return { response, status: data.status };
};
