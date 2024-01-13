import { SocketStream } from '@fastify/websocket';
import { FastifyReply, FastifyRequest } from 'fastify';

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class ConflictError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class OnChainError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'OnChainError';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function httpHandleError(error: any, request: FastifyRequest, reply: FastifyReply): void {
  if (error instanceof Error) {
    request.log.error(error);
  }
  if (error instanceof NotFoundError) {
    reply.status(404).send({ error: error.message || 'Not Found.' });
  } else if (error instanceof ValidationError) {
    reply.status(400).send({ error: error.message || 'Bad Request.' });
  } else if (error instanceof AuthorizationError) {
    reply.status(401).send({ error: error.message || 'Unauthorized.' });
  } else if (error instanceof ConflictError) {
    reply.status(409).send({ error: error.message || 'Conflict.' });
  } else if (error instanceof OnChainError) {
    reply.status(400).send({ error: error.message || 'On Chain Error.' });
  } else {
    reply.status(500).send({ error: error.message || 'Internal Server Error.' });
  }
}

export function wsHandleError(error: any, connection: SocketStream, request: FastifyRequest): void {
  if (error instanceof Error) {
    request.log.error(error);
  }
  if (error instanceof NotFoundError) {
    connection.socket.send(JSON.stringify({ error: error.message || 'Not Found.' }));
  } else if (error instanceof ValidationError) {
    connection.socket.send(JSON.stringify({ error: error.message || 'Bad Request.' }));
  } else if (error instanceof AuthorizationError) {
    connection.socket.send(JSON.stringify({ error: error.message || 'Unauthorized.' }));
  } else if (error instanceof ConflictError) {
    connection.socket.send(JSON.stringify({ error: error.message || 'Conflict.' }));
  } else if (error instanceof OnChainError) {
    connection.socket.send(JSON.stringify({ error: error.message || 'On Chain Error.' }));
  } else {
    connection.socket.send(JSON.stringify({ error: error.message || 'Internal Server Error.' }));
  }
}
