import { FastifyInstance } from 'fastify';

export const getUser = async (app: FastifyInstance, userId: string) => {
  const response = await app.inject({
    method: 'GET',
    url: `/user/${userId}`,
  });
  const data = JSON.parse(response.body);
  return { response: response, user: data.user };
};
